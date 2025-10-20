# AI-SDK + Capacitor

This project contains the **API** and the **Client** app.

## How to test

1. Install dependencies in both `/api` and `/client` folders.
2. Create a `.env` file in the `/api` folder and add the following line:

```
OPENAI_API_KEY=your_openai_api_key_here
```

3. Edit the `client/nuxt.config.ts` file and replace `apiBase` with the URL of your API … or your local IP.
4. Test it out in browser first. You should be able to see text streaming from the API.
5. Generate a capacitor build and open it in iOS simulator (details below).

## API

To run:

```bash
bun dev
```

## Client

To run & test in browser:

```bash
bun dev
```

To generate a build and sync capacitor for iOS:

```bash
bun run generate
bun cap sync
bun cap open ios
```
