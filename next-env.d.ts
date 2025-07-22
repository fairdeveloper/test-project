/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

interface Window {
  gtag: (
    event: 'config',
    trackingId: string,
    config: {
      page_path: string;
    }
  ) => void;
}
