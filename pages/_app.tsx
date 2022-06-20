import { AnimatePresence } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

import Layout from "../app/layouts/IndexLayout";
import Chakra from "../ui/structure/chakra";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Chakra>
      <Layout>
        <AnimatePresence exitBeforeEnter initial={false}>
          <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
          </SessionProvider>
        </AnimatePresence>
      </Layout>
    </Chakra>
  );
}

export default MyApp;
