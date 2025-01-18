import themes from "daisyui/src/theming/themes";

const config = {
  // REQUIRED
  appName: "TurboTrav",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "The NextJS boilerplate with all you need to build your SaaS, AI tool, or any other web app.",
  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domainName: "shipfa.st",
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (resend.supportEmail) otherwise customer support won't work.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
    plans: [
      {
        // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1QbKzHDk6tiSWnmq1KZXKgde"
            : "price_456",
        //  REQUIRED - Name of the plan, displayed on the pricing page
        name: "Standard",
        // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
        description: 'Perfekt för hobbytravare',
        // The price you want to display, the one user will be charged on Stripe.
        price: 249,
        recurrance: 'månad',
        // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
        //priceAnchor: 99,
        features: [
          { name: 'AI-analyser för V75 och V86' },
          { name: 'Detaljerade insikter för varje lopp' },
          { name: 'Tidiga analyser' },
          { name: 'Statistik och trender' },
          { name: 'Obegränsad tillgång till historiska resultat' }
        ],
      },
      {
        // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1QeFtkDk6tiSWnmqozrOLDit"
            : "price_456",
        //  REQUIRED - Name of the plan, displayed on the pricing page
        name: "Premium",
        recommended: true,
        // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
        description: 'För den seriösa spelaren',
        // The price you want to display, the one user will be charged on Stripe.
        price: 499,
        recurrance: 'månad',
        // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
        //priceAnchor: 99,
        features: [
          { name: 'Allt i Standard'},
          { name: 'Avancerad spelstrategier'},
          { name: 'Prioriterad kundsupport'},
          { name: 'Exklusiva insikter'},
          { name: 'Djupgående statistik och trender'},
          { name: 'Tidiga prediktioner'},
        ],
      },
        {
          // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
          priceId:
            process.env.NODE_ENV === "development"
              ? "price_1QihxtDk6tiSWnmql7TRLPGF"
              : "price_456",
          //  REQUIRED - Name of the plan, displayed on the pricing page
          name: "Standard",
          // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
          description: 'Perfekt för hobbytravare',
          // The price you want to display, the one user will be charged on Stripe.
          price: 2390,
          recurrance: 'år',
          // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
          //priceAnchor: 99,
          features: [
            { name: 'AI-analyser för V75 och V86' },
            { name: 'Detaljerade insikter för varje lopp' },
            { name: 'Tidiga analyser' },
            { name: 'Statistik och trender' },
            { name: 'Obegränsad tillgång till historiska resultat' }
          ],
        },
        {
          // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
          priceId:
            process.env.NODE_ENV === "development"
              ? "price_1QihyWDk6tiSWnmqlskpRSkt"
              : "price_456",
          //  REQUIRED - Name of the plan, displayed on the pricing page
          name: "Premium",
          recommended: true,
          // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
          description: 'För den seriösa spelaren',
          // The price you want to display, the one user will be charged on Stripe.
          price: 4790,
          recurrance: 'år',
          // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
          //priceAnchor: 99,
          features: [
            { name: 'Allt i Standard'},
            { name: 'Avancerad spelstrategier'},
            { name: 'Prioriterad kundsupport'},
            { name: 'Exklusiva insikter'},
            { name: 'Djupgående statistik och trender'},
            { name: 'Tidiga prediktioner'},
          ],
        },
    ],
  },
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  resend: {
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `ShipFast <noreply@resend.shipfa.st>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `Marc at ShipFast <marc@resend.shipfa.st>`,
    // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "marc.louvion@gmail.com",
  },
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode). If you any other theme than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
    theme: "light",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
    // OR you can just do this to use a custom color: main: "#f37055". HEX only.
    main: themes["light"]["primary"],
  },
  auth: {
    // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
    loginUrl: "/signin",
    // REQUIRED — the path you want to redirect users after successfull login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignin.js
    callbackUrl: "/dashboard",
  },
};

export default config;
