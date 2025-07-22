/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// See https://nextjs.org/docs/basic-features/typescript for more information.

// Google Analytics için gtag tip tanımını buraya ekliyoruz
interface Window {
  gtag: (
    event: 'config',
    trackingId: string,
    config: {
      page_path: string;
    }
  ) => void;
}