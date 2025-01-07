import ButtonAccount from "@/components/ButtonAccount";
import ButtonCheckout from "@/components/ButtonCheckout";
import config from "@/config";

export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Dashboard() {
  return (
    <main className="min-h-screen p-8 pb-24 flex justify-center">
      <div className="max-w-3xl w-full border p-6 rounded-lg shadow-lg">
        <section className="space-y-8">
          <ButtonAccount />
          <h1 className="text-3xl md:text-4xl font-extrabold">Private Page</h1>
        </section>
        {config.stripe.plans.map((plan, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-md my-4">
            <h2 className="text-2xl font-bold">{plan.name}</h2>
            <p className="text-gray-600">{plan.description}</p>
            <ul className="list-disc list-inside my-2">
              {plan.features.map((feature, idx) => (
                <li key={idx}>{feature.name}</li>
              ))}
            </ul>
            <ButtonCheckout 
              priceId={plan.priceId} 
              mode="subscription" 
              buttonText={`Subscribe to ${plan.name}`} 
            />
          </div>
        ))}
      </div>
    </main>
  );
}
