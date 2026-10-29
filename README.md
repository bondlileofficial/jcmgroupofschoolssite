# JCM-Primary-School

## Shared school-system database and sign-in

The dashboard at `System/jcm-school-system.html` stores its shared records in Supabase. Browser-local demo accounts and local storage do not sync between computers.

### Configure Netlify and Supabase

1. Create a Supabase project and run [`supabase-schema.sql`](supabase-schema.sql) in the Supabase SQL Editor.
2. In Netlify, set `SUPABASE_URL` and `SUPABASE_ANON_KEY` as environment variables, then redeploy. The anon key is intended for browser use; never put the Supabase service-role key in the site or these variables.
3. In Supabase Authentication > URL Configuration, set the Site URL to the deployed site and add `https://YOUR-SITE/System/jcm-school-system.html` to the allowed redirect URLs. Add the equivalent local URL if testing locally.
4. Enable email/password sign-up and configure SMTP if email confirmation and password-reset emails should be delivered reliably.
5. To use Google sign-in, enable the Google provider under Supabase Authentication > Providers and configure its client ID and secret there. Add the Supabase callback URL shown by the provider settings to the Google OAuth client's authorized redirect URIs.
6. Create an Auth user for each administrator and set its role metadata (`role`, `campus`, `className`, and `name`) in Supabase. For example: `{"role":"Admin","campus":"primary","className":"","name":"Primary Admin"}`. New self-registrations default to Teacher or Student based on the selected role.

Once configured, email/password and Google sign-in use Supabase Auth; registration and password recovery use Supabase email flows. Netlify hosts the app and serves the public Supabase configuration function. Admin changes are saved to the shared `jcm_portal_state` row and loaded by other authenticated users. The built-in `@jcm` demo accounts only work in browser-local fallback mode and do not sync across computers.