exports.handler = async () => {
  const url = process.env.SUPABASE_URL || '';
  const anonKey = process.env.PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

  let validProjectUrl = false;
  try {
    const parsedUrl = new URL(url);
    validProjectUrl = parsedUrl.protocol === 'https:' && !parsedUrl.username && !parsedUrl.password;
  } catch {
    validProjectUrl = false;
  }

  const isPublicKey = (key) => {
    if (key.startsWith('sb_publishable_')) return true;

    const payload = key.split('.')[1];
    if (!payload) return false;

    try {
      return JSON.parse(Buffer.from(payload, 'base64').toString('utf8')).role === 'anon';
    } catch {
      return false;
    }
  };

  if (!validProjectUrl || !isPublicKey(anonKey)) {
    return {
      statusCode: 503,
      headers: { 'cache-control': 'no-store' },
      body: JSON.stringify({ error: 'Supabase public configuration is missing or invalid.' }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store',
    },
    body: JSON.stringify({ url, anonKey }),
  };
};
