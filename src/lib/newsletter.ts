import { getSupabaseClient } from './supabase';

export async function subscribeToNewsletter(email: string): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();

  const { error } = await getSupabaseClient()
    .from('newsletter_subscribers')
    .insert({
      email: normalizedEmail,
      source: 'website-footer',
    });

  if (error) throw error;
}
