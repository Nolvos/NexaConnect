# Generated catalogue and solution imagery

The 44 images in `public/catalogue/` were created for this project with the built-in image generation tool. Every product category, product guide and enterprise solution has its own image. They are generic illustrations, not photographs of an offered SKU, an installed client system, or a vendor's software interface. Do not use them to substantiate model-specific specifications, inventory, or support claims.

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

The additional 32 images use the same style and constraints, with these distinct subjects:

| Asset | Prompt subject |
| --- | --- |
| `business-routers.png` | A generic small-office wired router on a tidy network shelf with Ethernet cables. |
| `managed-switches.png` | A managed Ethernet switch in a data-centre rack, tight front three-quarter view showing rows of ports and tidy fibre uplinks, professional communications-room setting. |
| `unmanaged-switches.png` | A small simple unmanaged desktop Ethernet switch on a clean office shelf, a few short patch leads, compact scale clearly different from a rack switch. |
| `poe-switches.png` | A rack-mounted PoE Ethernet switch feeding several generic camera and wireless access point cables, subtle port activity lights, switch dominates frame. |
| `outdoor-access-points.png` | A weatherproof unbranded wireless access point mounted high on an exterior business-building wall, neat conduit, courtyard background. |
| `network-transceivers.png` | Two small fibre-optic transceiver modules beside a clean fibre patch lead on an anti-static workbench, close-up macro product photography. |
| `network-racks.png` | A tall black network cabinet with patch panels, shelves, power distribution and carefully dressed cables in a bright communications room. |
| `dell-rack-servers.png` | A generic unbranded rack server chassis in a modern data centre, close three-quarter view of front drive bays and rack rails, cool neutral lighting; no vendor identity. |
| `dell-tower-servers.png` | A generic unbranded tower server standing beside an office IT workbench, visible tower proportions and ventilation, warm neutral light; no vendor identity. |
| `hpe-rack-servers.png` | A generic unbranded rack server installation seen from an open aisle, two silver rack chassis and drive bays in a neat enterprise data centre, pine-green accent light; no vendor identity. |
| `hpe-tower-servers.png` | A generic unbranded tower server on a technician bench, side panel partly open to reveal serviceable interior and drive cage, clean bright light; no vendor identity. |
| `server-storage.png` | Enterprise server storage drives and drive carriers beside an open rack server chassis, emphasis on storage expansion and bays. |
| `budget-ip-cameras.png` | One modest compact generic IP security camera mounted at the entrance of a small shop, practical daytime installation, no visible brand. |
| `business-dome-cameras.png` | A generic dome security camera installed on a reception ceiling in a modern business interior, close-up with the curved dome clearly visible. |
| `business-bullet-cameras.png` | A generic bullet security camera under an office building eave aimed toward an exterior entrance, weatherproof housing in focus. |
| `premium-ptz-cameras.png` | A large generic pan-tilt-zoom surveillance camera mounted at a commercial site with broad monitored space in the background, detailed rotating housing. |
| `premium-fixed-cameras.png` | A premium-looking but unbranded fixed IP camera in a challenging low-light lobby scene, substantial lens housing, no claimed analytics interface. |
| `digital-video-recorders.png` | A generic digital video recorder beside analogue camera cables and a simple monitor showing indistinct, non-readable surveillance thumbnails, tidy technician desk. |
| `surveillance-storage.png` | High-capacity surveillance recording hard drives in a storage tray beside a generic recorder, macro focus on drives and retention storage. |
| `camera-accessories.png` | Camera mounting brackets, junction box, weatherproof connectors, cable and a PoE injector arranged neatly on a technician workbench. |
| `computer-ram.png` | A pair of unbranded desktop RAM modules and a smaller laptop memory module on an anti-static workbench, memory chips clearly visible. |
| `solid-state-drives.png` | An unbranded M.2 NVMe solid-state drive and a 2.5-inch SATA SSD on a clean dark work surface, close product photography. |
| `hard-disk-drives.png` | Two unbranded hard disk drives, one desktop-size and one compact size, on a technician bench with subtle metallic texture. |
| `processors.png` | An unbranded desktop computer processor resting beside an open motherboard socket on an anti-static workbench, close-up with no readable markings. |
| `motherboards.png` | A full computer motherboard laid flat on an anti-static workbench, visible CPU socket, RAM slots and expansion slots, no brand marks. |
| `graphics-cards.png` | A large unbranded graphics card with fans and display outputs on a clean workstation build bench, three-quarter product view. |
| `power-supplies.png` | An unbranded modular computer power supply with neatly arranged cables and connectors on a neutral studio work surface. |
| `computer-cooling.png` | A computer CPU air cooler with heat pipes and fan beside two case fans in an open desktop case, clean detailed hardware photography. |
| `avaya-system-manager.png` | An enterprise communications administrator workspace with rack equipment and a generic abstract management dashboard on a monitor, no readable UI or branding. |
| `avaya-aes.png` | A generic enterprise telephony integration scene: desk IP phone, server appliance, neat network patch cables and an abstract application integration diagram on a monitor; no readable UI. |
| `avaya-contact-recorder.png` | A legacy business call recording archive workspace: unbranded desk phone, storage server and abstract audio waveform on a monitor, no readable UI. |
| `verint-wfo.png` | A contact-centre quality and performance review workspace with headset, abstract call waveform and coaching charts on a monitor, distinct from staffing schedule imagery, no readable UI. |

`src/lib/products.ts` maps each product enquiry guide to a distinct image. `src/lib/solutions.ts` selects a distinct image for each enterprise offering. Four original assets (`network-switches`, `rack-tower-servers`, `security-cameras` and `computer-components`) appear only on category cards; the other eight appear on applicable guides or solutions. Keep alt text descriptive and identify generic visuals as illustrative in alt text, without adding a visible image caption. Replace a generic image with an exact product photo only after inventory, manufacturer rights and model identity have been verified.
