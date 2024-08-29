import { H2 } from "@/components/ui/headings";
import { Separator } from "@/components/ui/separator";

const FAQ_ITEMS = [
  {
    q: "What does this site do?",
    a: "names.wannabet.cc allows you to register an [ethereum name service] name that you can use to identify your address on any wannabet site.",
  },
  {
    q: "Can I get more than one name?",
    a: "We only allow one name per address",
  },
  {
    q: "Can I change my assigned name?",
    a: "No, there is no manual flow for changing your wannabet name. For assistance, join our telegram channel.",
  },
  {
    q: "Does a wannabet name cost any money",
    a: "No, every wannabet name is completely free! The only thing that is required is a cryptographic signature from your address to prove registration.",
  },
  {
    q: "Does my assigned name replace my current .eth?",
    a: "No, you can use the toggle on the profile page to signify wether you want to show your ENS primary name of wannabet name on wannabet.",
  },
  {
    q: "Can two users have the same name?",
    a: "No, our system ensures that each assigned name is unique within the platform.",
  },
  {
    q: "Is my name public?",
    a: "While there is no blockchain transaction showing the connection between your address and your name, you can see a feed of the name registrations on our site.",
  },
  {
    q: "Is this an ENS name?",
    a: "Yes! wannabet.eth subnames are stored offchain, meaning that the records don't exist on a blockchain, but are still resolvable in apps",
  },
  {
    q: "Can I use this assigned name on other platforms?",
    a: 'Yes! If you want to use your wannabet name in other dapps, go to https://app.ens.domains/[your name].wannabet.eth and click "set primary"',
  },
];

export default function FaqPage() {
  return (
    <>
      <section className="mt-4">
        <div className="w-full px-4 pb-32 lg:px-6">
          <H2 className="mb-2">Frequently asked questions</H2>
          <Separator />
          <div className="grid pt-8 text-left md:grid-cols-2 md:gap-16">
            <div>
              {FAQ_ITEMS.slice(0, 5).map((item, i) => (
                <div className="mb-10" key={i}>
                  <FaqItem q={item.q} a={item.a} />
                </div>
              ))}
            </div>
            <div>
              {FAQ_ITEMS.slice(5).map((item, i) => (
                <div className="mb-10" key={i}>
                  <FaqItem q={item.q} a={item.a} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <>
      <h3 className="mb-4 flex items-center text-lg font-medium text-gray-900 dark:text-white">
        <svg
          className="mr-2 h-5 w-5 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          ></path>
        </svg>
        {q}
      </h3>
      <p>{a}</p>
    </>
  );
}
