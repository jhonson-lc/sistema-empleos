import { AnimatePresence } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

import Layout from "../app/layouts/IndexLayout";
import Chakra from "../ui/structure/chakra";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Chakra>
      <SessionProvider session={pageProps.session}>
        <Layout session={pageProps.session}>
          <AnimatePresence exitBeforeEnter initial={false}>
            <Component {...pageProps} />
          </AnimatePresence>
        </Layout>
      </SessionProvider>
    </Chakra>
  );
}

export default MyApp;
