import Link from "next/link";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { ContactForm } from "../components/ui/ContactForm";

export default function HomePage() {
  return (
    <>
      <div className="relative isolate">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-50 pointer-events-none"
          src="/hero.mp4"
          aria-hidden="true"
        />
        <div className="relative z-10">
          <Container className="py-10 md:py-16 text-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Welcome to The Carenest
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-neutral-700">
                Our mission is to make it easier to find trusted wellbeing and
                care support in Colchester, Tendring, and nearby. We believe in
                calm, accessible, and high-quality information for everyone.
              </p>
              <p className="text-base md:text-lg max-w-xl mx-auto mb-10 text-neutral-600">
                Browse a curated directory of services, resources, and support
                for you or your loved ones. No ads, no noise—just clear, helpful
                options.
              </p>
              <Link href="/directory">
                <Button type="button" variant="primary">
                  Browse care options
                </Button>
              </Link>
            </div>
          </Container>
        </div>
      </div>
      <ContactForm />
    </>
  );
}
