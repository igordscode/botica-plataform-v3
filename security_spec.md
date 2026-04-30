# Firebase Security Specification - Botica Guarani

## Data Invariants
1. **User Integrity**: A user document must match the authenticated `request.auth.uid`.
2. **Lead Ownership**: Leads can only be created/read by the owner (`userId`) or an admin.
3. **Chat Session Isolation**: Users can only access their own chat sessions and associated messages.
4. **Agent Validity**: `currentAgent` in chat sessions must be one of the pre-defined bot identities.
5. **Prescription Safety**: Users can only upload and view their own prescriptions.
6. **Immutable Fields**: `createdAt` and `userId` fields cannot be changed after creation.
7. **Strict Schema**: No "shadow fields" allowed (exact size matching on create).
8. **Validated IDs**: Path variables must match the standard ID regex.

## The "Dirty Dozen" Payloads

### 1. Identity Spoofing (Users)
Attacker tries to create a user profile for someone else.
```json
{
  "uid": "victim_uid",
  "email": "victim@example.com",
  "displayName": "Spoofed Name"
}
```
**Expected Result**: `PERMISSION_DENIED` (uid must match auth.uid)

### 2. Privilege Escalation (Admins)
Attacker tries to mark themselves as admin if the field existed in the user doc (not used here but a standard check).
```json
{
  "isAdmin": true
}
```
**Expected Result**: `PERMISSION_DENIED` (no whitelisted key for isAdmin)

### 3. Cross-User Data Access (Leads)
Attacker tries to read a lead belonging to another user.
**Operation**: `get /leads/another_users_lead`
**Expected Result**: `PERMISSION_DENIED`

### 4. Shadow Field Injection (Chat Sessions)
Attacker tries to add a hidden tracking field to a session.
```json
{
  "userId": "my_uid",
  "currentAgent": "SOFIA",
  "hacked": true
}
```
**Expected Result**: `PERMISSION_DENIED` (exact size matching on create)

### 5. Invalid Agent State (Chat Sessions)
Attacker tries to set an invalid agent.
```json
{
  "userId": "my_uid",
  "currentAgent": "HACKER_BOT"
}
```
**Expected Result**: `PERMISSION_DENIED` (enum validation)

### 6. Orphaned Message (Messages)
Attacker tries to create a message in a session they don't own.
```json
{
  "sessionId": "victim_session_id",
  "role": "user",
  "content": "Hello"
}
```
**Expected Result**: `PERMISSION_DENIED` (must verify parent session ownership)

### 7. Historical Modification (Messages)
Attacker tries to edit a model response.
```json
{
  "content": "Price is 0 Gs"
}
```
**Expected Result**: `PERMISSION_DENIED` (messages should be immutable or only user role editable)

### 8. Prescription Tampering (Prescriptions)
Attacker tries to change the status of an analyzed prescription back to pending.
```json
{
  "status": "pending"
}
```
**Expected Result**: `PERMISSION_DENIED` (status transitions should be restricted or only allowed by admin)

### 9. Large Payload Resource Exhaustion (Messages)
Attacker tries to send a 1MB string in content.
```json
{
  "content": "A".repeat(1000000)
}
```
**Expected Result**: `PERMISSION_DENIED` (size check on string)

### 10. ID Poisoning (Paths)
Attacker tries to access a document with a malicious jumbo ID.
**Path**: `/users/very_long_malicious_id_string_over_128_chars_...`
**Expected Result**: `PERMISSION_DENIED` (isValidId regex)

### 11. Timestamp Spoofing (Leads)
Attacker tries to set a fake `createdAt` in the past.
```json
{
  "createdAt": "1990-01-01T00:00:00Z"
}
```
**Expected Result**: `PERMISSION_DENIED` (must use request.time)

### 12. List Scraping (All Collections)
Attacker tries to list all leads without filtering by `userId`.
**Query**: `db.collection('leads').get()`
**Expected Result**: `PERMISSION_DENIED` (list rules must enforce userId parity)
