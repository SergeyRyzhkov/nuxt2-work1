export default class AppSettings {
  running_line: string;
  phone: string;
  address: string;
  email: string;
  google_play: string;
  app_store: string;
  min_price: number;
  product_info: {
    title: string;
    status: true;
    description: string;
  };

  socials: { fb?: string; vk?: string; youtube?: string; telegram?: string; whatsapp?: string; instagram?: string };
}
