# Namecheap DNS Setup for Google Search Console Verification

## Step-by-Step Instructions

### 1. Log in to Namecheap
- Go to: https://www.namecheap.com
- Sign in to your account

### 2. Access Domain Management
- Click **"Domain List"** from the left sidebar (or from your dashboard)
- Find your domain: **`karnallocal.in`**
- Click the **"Manage"** button next to it

### 3. Navigate to DNS Settings
- Click on the **"Advanced DNS"** tab at the top
- You'll see a section called **"Host Records"** or **"DNS Records"**

### 4. Add TXT Record
- Click the **"Add New Record"** button
- In the record form that appears:
  - **Type:** Select `TXT Record` from the dropdown
  - **Host:** Enter `@` (or leave it blank/empty - this means the root domain)
  - **Value:** Enter the full verification string:
    ```
    google-site-verification=bSfYzkVUrUfXcwqiGTB8RKc8gYBdzj9w9B61e
    ```
  - **TTL:** Leave as `Automatic` or select `30 min`
- Click the **checkmark (✓)** or **"Save"** button to save the record

### 5. Save All Changes
- If there's a **"Save All Changes"** button at the bottom, click it
- Wait for confirmation that changes are saved

### 6. Verify in Google Search Console
- Go back to Google Search Console
- Click the **"VERIFY"** button
- If it doesn't work immediately, wait 5-10 minutes (DNS propagation can take time)
- If it still fails, wait up to 24 hours and try again

## Important Notes

⚠️ **Host Field:**
- Use `@` to add the record to the root domain (`karnallocal.in`)
- Or leave it blank/empty (Namecheap treats blank as root domain)
- Do NOT enter `www` or any subdomain

⚠️ **Value Field:**
- Copy the ENTIRE string including `google-site-verification=`
- Make sure there are no extra spaces before or after
- The exact value should be:
  ```
  google-site-verification=bSfYzkVUrUfXcwqiGTB8RKc8gYBdzj9w9B61e
  ```

⚠️ **DNS Propagation:**
- DNS changes can take anywhere from a few minutes to 48 hours
- Usually works within 5-30 minutes
- If verification fails, wait and try again later

## What the Record Should Look Like

After adding, you should see a record like this in your DNS list:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| TXT | @ | google-site-verification=bSfYzkVUrUfXcwqiGTB8RKc8gYBdzj9w9B61e | Automatic |

## Troubleshooting

### Verification Fails Immediately
- Double-check the value is copied correctly (no extra spaces)
- Make sure Host is `@` or blank (not `www`)
- Wait 5-10 minutes and try again

### Verification Still Fails After Waiting
- Check if the TXT record appears in your DNS list
- Verify the record value matches exactly
- Try using a DNS checker tool: https://mxtoolbox.com/TXTLookup.aspx
  - Enter `karnallocal.in` and check if the TXT record appears
- Wait up to 24 hours for full DNS propagation

### Can't Find Advanced DNS Tab
- Make sure you're logged into the correct Namecheap account
- Some domains might use Namecheap's BasicDNS - you may need to switch to PremiumDNS or use a different DNS provider
- Contact Namecheap support if you can't access DNS settings

## Alternative: URL Prefix Verification

If DNS verification continues to fail, you can:
1. Remove the domain property in Google Search Console
2. Add a new property using **"URL prefix"** instead of **"Domain"**
3. Enter: `https://karnallocal.in`
4. Use HTML file upload or meta tag verification (easier and faster)

## After Verification

Once verified:
1. Submit your sitemap: `sitemap.xml`
2. Request indexing for important pages
3. Monitor your site's performance in Search Console

---

**Your Verification String:**
```
google-site-verification=bSfYzkVUrUfXcwqiGTB8RKc8gYBdzj9w9B61e
```

**Domain:** `karnallocal.in`
