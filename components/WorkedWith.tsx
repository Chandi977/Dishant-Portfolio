import Image from 'next/image';
import styles from './WorkedWith.module.css';

const companyLogos = [
  { src: '/companylogos/1704866896811.jpg', name: 'Client brand with a leaf monogram' },
  {
    src: '/companylogos/2927876b-5c45-40be-9f71-31fab5bbf119._SL5000_CR0_0_5000_1000_SX1500.avif',
    name: 'Kosha',
  },
  { src: '/companylogos/636cdd5aae3701000168adea.png', name: 'SK Industries' },
  { src: '/companylogos/85abf7e195629e2a4543585cb712ec5d.webp', name: 'HAPI Protect You' },
  { src: '/companylogos/Artboard 1.png', name: 'Cut Craving', invert: true },
  { src: '/companylogos/ASSAM.png', name: 'Assam Harvest Originals' },
  { src: '/companylogos/BEYOND.png', name: 'Beyond Foam' },
  { src: '/companylogos/BUZN.png', name: 'Buyza', invert: true },
  { src: '/companylogos/CAMIO.png', name: 'Camio' },
  { src: '/companylogos/DHOOP.png', name: 'Dadhna.co', invert: true },
  { src: '/companylogos/eco-logoo.png', name: 'Ecozone Lifestyle' },
  {
    src: '/companylogos/Logo_of_the_Bharatiya_Janata_Party.svg.webp',
    name: 'Bharatiya Janata Party',
  },
  { src: '/companylogos/GBLA.png', name: 'Bla Bli Blu Parfums' },
  { src: '/companylogos/Group_1171278141_1.jxl', name: 'Your Happy Life' },
  { src: '/companylogos/logo-2.webp', name: 'Crossair Engineers' },
  { src: '/companylogos/logo-small.png', name: 'Client brand with a gold rhino mark' },
  { src: '/companylogos/logo.png', name: 'Aura Furnishings' },
  { src: '/companylogos/logo1-90x90.webp', name: 'Cane German Outdoor Furniture' },
  { src: '/companylogos/logo4.webp', name: 'Runcon', invert: true },
  { src: '/companylogos/Logo_1200_X_630.avif', name: 'Dadhna.co' },
  { src: '/companylogos/NECTOR.png', name: 'Nector', invert: true },
  { src: '/companylogos/ON.png', name: 'Na Smart Professional', invert: true },
  {
    src: '/companylogos/small-poster-samajwadi-party-logo-sl-14981-wall-poster-13x19-original-imah39rptptzhmgc.webp',
    name: 'Samajwadi Party',
  },
  { src: '/companylogos/OZONE.png', name: 'Ozone Pharmaceuticals', invert: true },
  { src: '/companylogos/SATTVARA.png', name: 'Sattvara Organic Skincare' },
  { src: '/companylogos/shark-nutrition-logo.png', name: 'Shark Nutrition' },
  { src: '/companylogos/TARAYU.png', name: 'Tarayu', invert: true },
  { src: '/companylogos/Untitled-250-x-250-px-1.webp', name: 'Ramtatva' },
  { src: '/companylogos/WhatsApp_Image_2026-01-08_at_12.55.10_PM.avif', name: 'Teak & Traditions' },
  { src: '/companylogos/yogee-logo.avif', name: 'Yo-Gee' },
] as const;

export default function WorkedWith() {
  return (
    <section className={`${styles.section} worked-with`} aria-labelledby="worked-with-title">
      <header className={styles.header} data-motion="left">
        <span aria-hidden="true" />
        <h2 id="worked-with-title">Worked With</h2>
        <p>{companyLogos.length} brands / growing</p>
      </header>

      <div className={styles.slider} aria-label="Selected clients and collaborators">
        <div className={styles.track}>
          <ul className={styles.list}>
            {companyLogos.map(({ src, name, ...logo }, index) => (
              <li
                className={`${styles.logo} ${'invert' in logo ? styles.inverted : ''}`}
                key={`brand-${src}-${index}`}
              >
                <Image
                  src={src}
                  alt={name}
                  fill
                  sizes="(max-width: 640px) 150px, 230px"
                  draggable={false}
                />
              </li>
            ))}
          </ul>
          <ul className={styles.list} aria-hidden="true">
            {companyLogos.map(({ src, ...logo }, index) => (
              <li
                className={`${styles.logo} ${'invert' in logo ? styles.inverted : ''}`}
                key={`brand-dup-${src}-${index}`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 150px, 230px"
                  draggable={false}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
