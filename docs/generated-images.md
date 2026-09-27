# Generated catalogue and solution imagery

The 12 images in `public/catalogue/` were created for this project with the built-in image generation tool. They are generic illustrations, not photographs of an offered SKU, an installed client system, or a vendor's software interface. Do not use them to substantiate model-specific specifications, inventory, or support claims.

The prompt set used a shared direction: **realistic commercial/editorial technology photography; landscape composition suitable for cropped website cards; clean office or technician setting; soft neutral light and restrained pine-green accents; no people, logos, readable text, watermarks, exact model details, or vendor-interface claims.** The subject for each asset was:

| Asset | Prompt subject |
| --- | --- |
| `network-switches.png` | Generic rack router, managed switches and tidy patch cables. |
| `wireless-access-points.png` | Generic indoor ceiling access points and outdoor wall access point in a business campus. |
| `network-accessories.png` | Copper cabling, fibre transceivers and rack shelf in a wiring closet. |
| `rack-tower-servers.png` | Unbranded rack and tower servers in a data-centre setting. |
| `server-upgrades.png` | ECC memory, enterprise drives and open server chassis on a workbench. |
| `security-cameras.png` | Generic dome, bullet, fixed IP and PTZ camera form factors. |
| `surveillance-recording.png` | Generic recorder, storage drives and camera cabling with abstract camera views. |
| `computer-components.png` | RAM, SSD, HDD, processor and motherboard on an anti-static workbench. |
| `computer-build.png` | Graphics card, power supply, cooling fans and computer case. |
| `enterprise-telephony.png` | Unbranded desk IP phones, communications rack and abstract call-operations screens. |
| `workforce-analytics.png` | Abstract staffing schedules, forecast and performance charts on contact-centre screens. |
| `call-accounting.png` | Unbranded desk phone and abstract call-cost reporting charts. |

`src/lib/products.ts` maps product enquiry guides to relevant photo groups. `src/lib/solutions.ts` selects imagery for each enterprise offering. Keep alt text descriptive and continue to label these visuals as illustrative. Replace a generic image with an exact product photo only after inventory, manufacturer rights and model identity have been verified.
