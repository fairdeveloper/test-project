// Bu dosya, projemizdeki genel tipleri tanımlar.

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