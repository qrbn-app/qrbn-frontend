import Hero from "@/components/landing/Hero";
import DonationOptions from "@/components/landing/DonationOptions";
import Features from "@/components/landing/Features";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <Hero />
        <DonationOptions />
        <Features />
        
        {/* Testimonials Section */}
        <section className="py-20 bg-primary/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our <span className="text-trust">Community</span> Says
              </h2>
              <p className="text-text-secondary">
                Join thousands of satisfied users who trust QRBN.app for their Zakat and Qurban needs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  quote: "The transparency of the platform gave me confidence in where my Zakat was going. The NFT proof is a game-changer!",
                  author: "Ahmad S.",
                  role: "Donor since 2023"
                },
                {
                  quote: "As someone who values Islamic finance principles, I appreciate how QRBN.app ensures Shariah compliance at every step.",
                  author: "Fatima K.",
                  role: "Community Member"
                },
                {
                  quote: "The Qurban process was seamless, and receiving the NFT certificate made the experience even more special.",
                  author: "Yusuf M.",
                  role: "Donor"
                }
              ].map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-primary/30 backdrop-blur-sm p-6 rounded-xl border border-accent/10 hover:border-accent/30 transition-all duration-300"
                >
                  <div className="text-trust text-4xl mb-4">"</div>
                  <p className="text-text-primary mb-6 italic">{testimonial.quote}</p>
                  <div className="mt-auto">
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-sm text-text-secondary">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-trust/5"></div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center bg-primary/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-accent/10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Make a <span className="text-trust">Difference</span>?
              </h2>
              <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
                Join our community of donors and experience transparent, Shariah-compliant giving today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="/zakat" 
                  className="px-8 py-4 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-colors"
                >
                  Pay Zakat
                </a>
                <a 
                  href="/qurban" 
                  className="px-8 py-4 border border-accent/30 text-text-primary font-semibold rounded-lg hover:bg-accent/10 transition-colors"
                >
                  Donate Qurban
                </a>
              </div>
            </div>
          </div>
        </section>
        
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
