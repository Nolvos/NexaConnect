import type { IconName } from '@/components/Icon';

export type ProductCategorySlug = 'networking' | 'servers' | 'surveillance' | 'components';
export type CameraTier = 'Budget-friendly' | 'Business' | 'Premium';

export interface ProductCategory {
  slug: ProductCategorySlug;
  title: string;
  description: string;
  icon: IconName;
  image: { src: string; alt: string };
  href: string;
}

export const productCategories: ProductCategory[] = [
  { slug: 'networking', title: 'Networking', description: 'Routers, switches, wireless access points and the infrastructure that connects them.', icon: 'Network', image: { src: '/catalogue/network-switches.png', alt: 'Illustrative image of generic network switches and cabling' }, href: '/products/networking' },
  { slug: 'servers', title: 'Servers', description: 'Dell and HPE rack and tower server enquiries, with memory, storage and upgrade planning.', icon: 'Server', image: { src: '/catalogue/rack-tower-servers.png', alt: 'Illustrative image of unbranded rack and tower servers' }, href: '/products/servers' },
  { slug: 'surveillance', title: 'Cameras & surveillance', description: 'Budget-friendly, business and premium camera requirements, recording and accessories.', icon: 'Cctv', image: { src: '/catalogue/security-cameras.png', alt: 'Illustrative image of generic security cameras' }, href: '/products/surveillance' },
  { slug: 'components', title: 'Computer components', description: 'RAM, storage, processors and the compatible parts for your next build or upgrade.', icon: 'Cpu', image: { src: '/catalogue/computer-components.png', alt: 'Illustrative image of generic computer components' }, href: '/products/components' },
];

export interface ProductSpecification { label: string; value: string }
export interface ProductSource { title: string; url: string; checkedOn: string }

interface ProductBase {
  slug: string;
  category: ProductCategorySlug;
  name: string;
  /** "Brand to be selected" is an enquiry requirement, never a manufacturer. */
  brand: string;
  productType: string;
  summary: string;
  overview: string;
  keyFacts: string[];
  specifications: ProductSpecification[];
  useCases: string[];
  /** Filterable requirements; these are not promises of model capabilities. */
  features: string[];
  cameraTier?: CameraTier;
  image?: { src: string; alt: string; attribution?: string; attributionUrl?: string };
}

export interface EnquiryProduct extends ProductBase {
  kind: 'enquiry';
  /** Procurement guidance only: no model specification or stock claim. */
  sources?: never;
}

export interface VerifiedModelProduct extends ProductBase {
  kind: 'model';
  model: string;
  /** Required before an approved model can enter the public catalogue. */
  sources: [ProductSource, ...ProductSource[]];
  specificationScope: 'Model-supported options' | 'Quoted configuration';
  configurationNote: string;
}

export type Product = EnquiryProduct | VerifiedModelProduct;

/** Topic illustrations for enquiry guides; these do not depict a quoted model. */
const productIcons: Record<string, IconName> = {
  'business-routers': 'Router',
  'managed-switches': 'Network',
  'unmanaged-switches': 'EthernetPort',
  'poe-switches': 'PlugZap',
  'indoor-access-points': 'Wifi',
  'outdoor-access-points': 'RadioTower',
  'network-cabling': 'Cable',
  'network-transceivers': 'Radio',
  'network-racks': 'ServerCog',
  'dell-rack-servers': 'Server',
  'dell-tower-servers': 'ServerCog',
  'hpe-rack-servers': 'Server',
  'hpe-tower-servers': 'ServerCog',
  'server-memory': 'MemoryStick',
  'server-storage': 'HardDrive',
  'budget-ip-cameras': 'Camera',
  'business-dome-cameras': 'Cctv',
  'business-bullet-cameras': 'Video',
  'premium-ptz-cameras': 'RadioTower',
  'premium-fixed-cameras': 'Camera',
  'network-video-recorders': 'Video',
  'digital-video-recorders': 'Disc3',
  'surveillance-storage': 'HardDrive',
  'camera-accessories': 'Cable',
  'computer-ram': 'MemoryStick',
  'solid-state-drives': 'Disc3',
  'hard-disk-drives': 'HardDrive',
  processors: 'Cpu',
  motherboards: 'CircuitBoard',
  'graphics-cards': 'MonitorSmartphone',
  'power-supplies': 'PlugZap',
  'computer-cooling': 'Fan',
  'cases-and-accessories': 'Box',
};

export function productIcon(product: Product): IconName {
  return productIcons[product.slug] ?? getProductCategory(product.category)?.icon ?? 'Box';
}

/** Each published enquiry guide has its own image; category cards and solutions use separate files. */
const productPhotos = new Map<string, { src: string; alt: string }>([
  ['business-routers', { src: '/catalogue/business-routers.png', alt: 'Illustrative image of a generic small-office wired router with Ethernet cables' }],
  ['managed-switches', { src: '/catalogue/managed-switches.png', alt: 'Illustrative image of a generic managed rack switch and fibre uplinks' }],
  ['unmanaged-switches', { src: '/catalogue/unmanaged-switches.png', alt: 'Illustrative image of a compact unmanaged desktop Ethernet switch' }],
  ['poe-switches', { src: '/catalogue/poe-switches.png', alt: 'Illustrative image of a generic PoE switch with camera and access-point connections' }],
  ['indoor-access-points', { src: '/catalogue/wireless-access-points.png', alt: 'Illustrative image of generic indoor wireless access points in a business setting' }],
  ['outdoor-access-points', { src: '/catalogue/outdoor-access-points.png', alt: 'Illustrative image of a generic outdoor wireless access point on a building wall' }],
  ['network-cabling', { src: '/catalogue/network-accessories.png', alt: 'Illustrative image of network cabling and patch accessories in a wiring closet' }],
  ['network-transceivers', { src: '/catalogue/network-transceivers.png', alt: 'Illustrative image of generic fibre transceiver modules and a fibre patch cable' }],
  ['network-racks', { src: '/catalogue/network-racks.png', alt: 'Illustrative image of a populated network cabinet in a communications room' }],
  ['dell-rack-servers', { src: '/catalogue/dell-rack-servers.png', alt: 'Illustrative image of a generic unbranded rack server, not a specific Dell model' }],
  ['dell-tower-servers', { src: '/catalogue/dell-tower-servers.png', alt: 'Illustrative image of a generic unbranded tower server, not a specific Dell model' }],
  ['hpe-rack-servers', { src: '/catalogue/hpe-rack-servers.png', alt: 'Illustrative image of generic unbranded rack servers, not specific HPE models' }],
  ['hpe-tower-servers', { src: '/catalogue/hpe-tower-servers.png', alt: 'Illustrative image of a generic unbranded open tower server, not a specific HPE model' }],
  ['server-memory', { src: '/catalogue/server-upgrades.png', alt: 'Illustrative image of server memory modules and an open server chassis' }],
  ['server-storage', { src: '/catalogue/server-storage.png', alt: 'Illustrative image of server drive carriers beside an open rack chassis' }],
  ['budget-ip-cameras', { src: '/catalogue/budget-ip-cameras.png', alt: 'Illustrative image of a compact generic IP camera at a small shop entrance' }],
  ['business-dome-cameras', { src: '/catalogue/business-dome-cameras.png', alt: 'Illustrative image of a generic dome security camera in a business reception' }],
  ['business-bullet-cameras', { src: '/catalogue/business-bullet-cameras.png', alt: 'Illustrative image of a generic outdoor bullet security camera at an entrance' }],
  ['premium-ptz-cameras', { src: '/catalogue/premium-ptz-cameras.png', alt: 'Illustrative image of a generic PTZ camera overlooking a commercial site' }],
  ['premium-fixed-cameras', { src: '/catalogue/premium-fixed-cameras.png', alt: 'Illustrative image of a generic fixed camera in a low-light business lobby' }],
  ['network-video-recorders', { src: '/catalogue/surveillance-recording.png', alt: 'Illustrative image of a generic network recorder with surveillance storage and camera views' }],
  ['digital-video-recorders', { src: '/catalogue/digital-video-recorders.png', alt: 'Illustrative image of a generic digital video recorder with analogue camera cables' }],
  ['surveillance-storage', { src: '/catalogue/surveillance-storage.png', alt: 'Illustrative image of hard drives and a recording system for surveillance storage' }],
  ['camera-accessories', { src: '/catalogue/camera-accessories.png', alt: 'Illustrative image of camera brackets, junction box, cables and a PoE injector' }],
  ['computer-ram', { src: '/catalogue/computer-ram.png', alt: 'Illustrative image of unbranded desktop and laptop RAM modules' }],
  ['solid-state-drives', { src: '/catalogue/solid-state-drives.png', alt: 'Illustrative image of generic M.2 and 2.5-inch solid-state drives' }],
  ['hard-disk-drives', { src: '/catalogue/hard-disk-drives.png', alt: 'Illustrative image of generic hard disk drives on a technician bench' }],
  ['processors', { src: '/catalogue/processors.png', alt: 'Illustrative image of a generic processor beside an open motherboard socket' }],
  ['motherboards', { src: '/catalogue/motherboards.png', alt: 'Illustrative image of an unbranded computer motherboard with socket and expansion slots' }],
  ['graphics-cards', { src: '/catalogue/graphics-cards.png', alt: 'Illustrative image of an unbranded graphics card on a workbench' }],
  ['power-supplies', { src: '/catalogue/power-supplies.png', alt: 'Illustrative image of a generic modular computer power supply and cables' }],
  ['computer-cooling', { src: '/catalogue/computer-cooling.png', alt: 'Illustrative image of a computer CPU cooler and case fans' }],
  ['cases-and-accessories', { src: '/catalogue/computer-build.png', alt: 'Illustrative image of a generic computer case with related build components' }],
]);

const selectionBrand = 'Brand to be selected';
const rows = (items: Array<[string, string]>): ProductSpecification[] =>
  items.map(([label, value]) => ({ label, value }));

const procurement = rows([
  ['Manufacturer / model', 'Exact manufacturer and model to be agreed in the quotation.'],
  ['Warranty', 'Confirm warranty term, coverage, region and support provider in the quotation.'],
]);

const networkRequirements = rows([
  ['Ports / port speeds', 'Specify endpoint count, required link speeds and room for expansion.'],
  ['Uplinks', 'Confirm copper or fibre interfaces, speeds and compatible transceivers.'],
  ['Management', 'Specify local, central or cloud management and any licence requirements.'],
  ['Security', 'Agree access controls, network segmentation and required security functions.'],
  ['Mounting / power', 'Confirm placement, rack or wall mounting, power source and accessories.'],
]);

const serverRequirements = rows([
  ['Processor / sockets / cores', 'Size processor family, socket count and core count to workload and software licensing.'],
  ['Memory', 'Specify memory type, capacity, ECC requirements and supported expansion for the selected model.'],
  ['Drive bays / storage', 'Confirm bay count, drive format, interface, usable capacity and endurance.'],
  ['RAID controller', 'Agree controller, cache protection and RAID level for the selected drives.'],
  ['Networking', 'Specify adapter count, link speed and interface type.'],
  ['Power supplies', 'Confirm redundant power requirements, input supply and rated capacity.'],
  ['Remote management', 'Confirm available controller features and the required management licence.'],
  ['Expansion slots', 'Check PCIe generation, slot availability and riser compatibility against the chosen model.'],
  ['Operating system', 'Check the vendor support matrix for the exact operating system or hypervisor version.'],
  ['Workload', 'Share virtual machine count, applications, storage growth and availability requirements.'],
]);

const cameraRequirements = rows([
  ['Resolution', 'Agree required image detail, scene coverage and recording bandwidth.'],
  ['Lens / field of view', 'Specify viewing distance and scene width; select fixed or varifocal optics accordingly.'],
  ['Night vision', 'Assess lighting and required night-time identification distance.'],
  ['Audio', 'Confirm whether audio is required and whether the selected camera supports it.'],
  ['PoE / power', 'Confirm the power method, standard and switch power budget.'],
  ['Weather resistance', 'Specify indoor or outdoor placement and required environmental rating.'],
  ['Storage / retention', 'Agree recording schedule, retention period and local or recorder storage.'],
  ['Recording compatibility', 'Verify recorder model, firmware, codec and supported camera integration.'],
  ['Analytics', 'Confirm required detection features and any recorder, licence or firmware dependencies.'],
]);

type OfferingInput = Omit<EnquiryProduct, 'kind' | 'brand' | 'overview' | 'specifications'> & {
  brand?: string;
  overview?: string;
  specifications: ProductSpecification[];
};

function offering(input: OfferingInput): EnquiryProduct {
  return {
    ...input,
    kind: 'enquiry',
    image: input.image ?? productPhotos.get(input.slug),
    brand: input.brand ?? selectionBrand,
    overview: input.overview ?? `${input.summary} Share your requirements so the exact model, configuration and compatibility can be agreed before a quotation.`,
    specifications: [...input.specifications, ...procurement],
  };
}

/**
 * Approved inventory has not been supplied. These records describe categories
 * customers can enquire about, not stocked SKUs or verified model specifications.
 * Add a kind: 'model' record only after business approval and manufacturer checks.
 */
export const products: Product[] = [
  offering({ slug: 'business-routers', category: 'networking', name: 'Business routers', productType: 'Routers', summary: 'Plan connectivity between your office network, internet links and remote sites.', keyFacts: ['WAN links to agree', 'VPN requirements', 'Throughput sizing'], specifications: [...networkRequirements, ...rows([['Routing / VPN', 'Specify WAN services, routing, VPN users and required throughput with security functions enabled.']])], useCases: ['Branch connectivity', 'Remote access planning', 'Internet link upgrades'], features: ['Routing', 'Remote access'] }),
  offering({ slug: 'managed-switches', category: 'networking', name: 'Managed switches', productType: 'Switches', summary: 'Define switching requirements for segmented business networks and central administration.', keyFacts: ['Port count to agree', 'VLAN requirements', 'Uplink selection'], specifications: networkRequirements, useCases: ['Office network refreshes', 'Voice and data segmentation', 'Access and distribution networks'], features: ['Managed', 'Rack mounting'] }),
  offering({ slug: 'unmanaged-switches', category: 'networking', name: 'Unmanaged switches', productType: 'Switches', summary: 'Discuss straightforward wired expansion where advanced management is unnecessary.', keyFacts: ['Port count to agree', 'Link speed selection', 'Desktop placement'], specifications: rows([['Ports / speeds', 'Confirm the number of wired devices and their required link speeds.'], ['Management', 'Unmanaged requirement; check whether VLAN or monitoring needs call for a managed alternative.'], ['Uplinks / power / mounting', 'Specify uplink speed, power supply and desktop or rack placement.']]), useCases: ['Small local networks', 'Simple wired expansion'], features: ['Unmanaged', 'Desktop placement'] }),
  offering({ slug: 'poe-switches', category: 'networking', name: 'PoE switches', productType: 'Switches', summary: 'Size a switch to carry data and power for compatible cameras, access points and phones.', keyFacts: ['PoE standard to agree', 'Power budget sizing', 'Powered endpoint count'], specifications: [...networkRequirements, ...rows([['PoE standard / budget', 'Match each endpoint to the required PoE standard; calculate per-port and total power including growth.']])], useCases: ['Camera installations', 'Wireless access points', 'IP phone networks'], features: ['PoE', 'Managed'] }),
  offering({ slug: 'indoor-access-points', category: 'networking', name: 'Indoor wireless access points', productType: 'Access points', summary: 'Plan indoor Wi-Fi around floor layout, client density and business applications.', keyFacts: ['Coverage survey', 'Wi-Fi generation selection', 'Indoor mounting'], specifications: [...networkRequirements, ...rows([['Wi-Fi / bands', 'Agree Wi-Fi generation, supported frequency bands and client compatibility.'], ['PoE standard / budget', 'Check the selected access point power requirements against the switch or injector.'], ['Environment', 'Indoor; confirm ceiling or wall mounting and site coverage.']])], useCases: ['Office Wi-Fi', 'Guest and staff networks', 'High-density indoor spaces'], features: ['Indoor', 'Wireless', 'PoE'] }),
  offering({ slug: 'outdoor-access-points', category: 'networking', name: 'Outdoor wireless access points', productType: 'Access points', summary: 'Specify outdoor coverage with suitable mounting, weather protection and power.', keyFacts: ['Outdoor installation', 'Coverage planning', 'Weather rating to agree'], specifications: [...networkRequirements, ...rows([['Wi-Fi / bands', 'Confirm generation, permitted frequency bands, antenna pattern and client compatibility.'], ['Environmental rating', 'Confirm temperature range, weather resistance, mounting and surge protection.'], ['PoE standard / budget', 'Match power source and cabling to the selected model and installation distance.']])], useCases: ['Outdoor coverage', 'Courtyards and shared areas', 'External workspaces'], features: ['Outdoor', 'Wireless', 'PoE'] }),
  offering({ slug: 'network-cabling', category: 'networking', name: 'Network cabling & accessories', productType: 'Infrastructure', summary: 'Plan cable runs, patch panels, outlets and connection accessories for your network.', keyFacts: ['Copper or fibre', 'Run lengths to agree', 'Termination planning'], specifications: rows([['Cable / interface', 'Specify copper category or fibre type, connector and required link speed.'], ['Installation', 'Confirm run length, indoor or outdoor rating, routing, patching and test requirements.'], ['PoE', 'Confirm cable suitability for endpoint power and installation conditions.']]), useCases: ['Office fit-outs', 'Network extensions', 'Rack patching'], features: ['Cabling', 'Rack mounting'] }),
  offering({ slug: 'network-transceivers', category: 'networking', name: 'Network transceivers', productType: 'Infrastructure', summary: 'Match optical or copper modules to the network equipment and the link between sites or racks.', keyFacts: ['Host compatibility', 'Link distance', 'Fibre type'], specifications: rows([['Form factor / speed', 'Confirm host port format and required line rate.'], ['Optics / connector', 'Specify wavelength, connector, fibre type and link distance.'], ['Compatibility', 'Verify exact switch or router model, firmware and approved module compatibility.']]), useCases: ['Fibre uplinks', 'Rack interconnects', 'Replacement modules'], features: ['Fibre uplinks'] }),
  offering({ slug: 'network-racks', category: 'networking', name: 'Network racks & cabinets', productType: 'Infrastructure', summary: 'Size racks, cabinets and accessories to the equipment, space and power available.', keyFacts: ['Rack size to agree', 'Equipment depth', 'Power and airflow'], specifications: rows([['Dimensions / mounting', 'Specify rack units, width, usable depth, floor or wall mounting and equipment rail requirements.'], ['Load / cooling', 'Check equipment weight, ventilation, cable access and available room clearance.'], ['Power / accessories', 'Agree power distribution, shelves, cable management and grounding requirements.']]), useCases: ['Communications rooms', 'Branch cabinets', 'Equipment organisation'], features: ['Rack mounting'] }),

  ...(['Dell', 'HPE'] as const).flatMap((brand) => (['Rack', 'Tower'] as const).map((formFactor) => offering({
    slug: `${brand.toLowerCase()}-${formFactor.toLowerCase()}-servers`, category: 'servers', name: `${brand} ${formFactor.toLowerCase()} servers`, brand, productType: `${formFactor} servers`,
    summary: `${brand} ${formFactor.toLowerCase()} server requirements, sized around your applications, capacity and growth.`,
    overview: `Discuss a ${brand} ${formFactor.toLowerCase()} server configuration for your workload. This is a procurement guide, not a particular server model. A model's supported options can differ from the processors, memory, storage and licences included in a quotation; confirm the exact bill of materials before ordering.`,
    keyFacts: [`${formFactor} form factor`, 'Workload-based sizing', 'Configuration to agree'],
    specifications: [...rows([['Form factor', `${formFactor}; exact dimensions, mounting and access requirements depend on the chosen model.`]]), ...serverRequirements],
    useCases: ['Business applications', 'Virtualisation planning', 'File and infrastructure services'], features: [formFactor, 'Configuration planning'],
  }))),
  offering({ slug: 'server-memory', category: 'servers', name: 'Server memory upgrades', productType: 'Server upgrades', summary: 'Plan memory expansion against the exact server, processor and existing DIMM configuration.', keyFacts: ['ECC requirements', 'Population rules', 'Capacity planning'], specifications: rows([['Server / processor', 'Provide the manufacturer, exact server model and installed processor configuration.'], ['Memory type / capacity', 'Confirm DDR generation, ECC type, supported DIMM format, capacity and speed.'], ['Population / compatibility', 'Check the vendor population rules and current modules; compatibility must be verified before quotation.']]), useCases: ['Virtual machine growth', 'Application memory expansion'], features: ['Memory', 'Configuration planning'] }),
  offering({ slug: 'server-storage', category: 'servers', name: 'Server storage & upgrades', productType: 'Server upgrades', summary: 'Scope drives, controllers and expansion options around your existing server and workload.', keyFacts: ['Drive and bay compatibility', 'RAID planning', 'Endurance requirements'], specifications: rows([['Storage', 'Specify usable capacity, drive interface, size, performance and endurance requirements.'], ['Bays / controller', 'Check available bays, carrier format, backplane, RAID or host controller and firmware compatibility.'], ['Expansion / power', 'Verify spare slots, cabling, supported components and power capacity for the proposed upgrade.'], ['Other upgrades', 'Share requirements for network adapters, processors, power supplies or remote-management licences.']]), useCases: ['Capacity expansion', 'Drive replacement', 'Server component upgrades'], features: ['Storage', 'Configuration planning'] }),

  offering({ slug: 'budget-ip-cameras', category: 'surveillance', name: 'Budget-friendly IP cameras', productType: 'IP cameras', cameraTier: 'Budget-friendly', summary: 'Start with essential scene coverage and recording requirements within your budget.', keyFacts: ['Budget-friendly brief', 'Coverage to agree', 'Recorder matching'], specifications: cameraRequirements, useCases: ['Small premises', 'Basic entrance coverage', 'Cost-conscious upgrades'], features: ['IP camera', 'Indoor', 'Outdoor'] }),
  offering({ slug: 'business-dome-cameras', category: 'surveillance', name: 'Business dome cameras', productType: 'Dome cameras', cameraTier: 'Business', summary: 'Specify dome-style cameras for business spaces, with lens and recording requirements agreed per location.', keyFacts: ['Dome form factor', 'Lens selection', 'Business requirements'], specifications: cameraRequirements, useCases: ['Reception areas', 'Internal circulation routes', 'Retail premises'], features: ['IP camera', 'Indoor'] }),
  offering({ slug: 'business-bullet-cameras', category: 'surveillance', name: 'Business bullet cameras', productType: 'Bullet cameras', cameraTier: 'Business', summary: 'Plan directional camera coverage with an installation rating and lens suited to the scene.', keyFacts: ['Bullet form factor', 'Outdoor rating to agree', 'Viewing distance'], specifications: cameraRequirements, useCases: ['Building entrances', 'External approaches', 'Perimeter coverage planning'], features: ['IP camera', 'Outdoor'] }),
  offering({ slug: 'premium-ptz-cameras', category: 'surveillance', name: 'Premium PTZ cameras', productType: 'PTZ cameras', cameraTier: 'Premium', summary: 'Discuss pan, tilt and zoom requirements for monitored areas needing adjustable coverage.', keyFacts: ['PTZ requirements', 'Zoom range to agree', 'Operator integration'], specifications: [...cameraRequirements, ...rows([['PTZ / zoom', 'Agree optical zoom, pan and tilt coverage, presets and controller compatibility.']])], useCases: ['Large monitored spaces', 'Operator-controlled surveillance', 'Detailed scene inspection'], features: ['IP camera', 'PTZ', 'Indoor', 'Outdoor'] }),
  offering({ slug: 'premium-fixed-cameras', category: 'surveillance', name: 'Premium fixed cameras', productType: 'IP cameras', cameraTier: 'Premium', summary: 'Define higher-detail or specialist scene requirements, with analytics and image performance verified per model.', keyFacts: ['Detail requirements', 'Analytics to verify', 'Scene-based selection'], specifications: cameraRequirements, useCases: ['Complex lighting environments', 'Detailed monitoring requirements', 'Specialist fixed coverage'], features: ['IP camera', 'Indoor', 'Outdoor', 'Analytics planning'] }),
  offering({ slug: 'network-video-recorders', category: 'surveillance', name: 'Network video recorders (NVR)', productType: 'Recorders', summary: 'Size recording for your IP camera count, image settings and retention needs.', keyFacts: ['IP camera channels', 'Retention sizing', 'Compatibility review'], specifications: rows([['Channels / bandwidth', 'Specify camera count, total recording bandwidth, resolution and codec requirements.'], ['Storage', 'Size drive bays and usable storage against retention, frame rate and recording schedule.'], ['Camera compatibility', 'Verify exact camera models, firmware and supported recording, audio and analytics functions.'], ['Power / access', 'Confirm any integrated PoE requirement, remote viewing, user permissions and licence needs.']]), useCases: ['New IP camera systems', 'Recording expansion', 'Recorder replacement'], features: ['IP recording', 'Storage'] }),
  offering({ slug: 'digital-video-recorders', category: 'surveillance', name: 'Digital video recorders (DVR)', productType: 'Recorders', summary: 'Review recording options for existing camera systems and compatible replacement equipment.', keyFacts: ['Camera signal matching', 'Channel count', 'Storage sizing'], specifications: rows([['Inputs / compatibility', 'Provide existing camera models and signal formats; verify input compatibility before selecting a DVR.'], ['Recording', 'Specify channels, resolution, frame rates and playback requirements.'], ['Storage / access', 'Agree retention, supported drive capacity, network access and permissions.']]), useCases: ['Existing analogue systems', 'Recorder replacement planning'], features: ['DVR recording', 'Storage'] }),
  offering({ slug: 'surveillance-storage', category: 'surveillance', name: 'Surveillance storage', productType: 'Storage & accessories', summary: 'Calculate recording capacity and match drives to the recording equipment.', keyFacts: ['Retention target', 'Recorder compatibility', 'Workload sizing'], specifications: rows([['Capacity / workload', 'Calculate capacity from camera count, bit rate, recording hours and retention.'], ['Interface / compatibility', 'Verify supported drive models, capacity limits, bays and recorder firmware.'], ['Recording resilience', 'Agree any supported redundancy and retention requirements.']]), useCases: ['Longer retention', 'Recording expansion', 'Drive replacement'], features: ['Storage'] }),
  offering({ slug: 'camera-accessories', category: 'surveillance', name: 'Camera mounts & accessories', productType: 'Storage & accessories', summary: 'Match brackets, junction boxes, cabling and power accessories to the installation.', keyFacts: ['Mount compatibility', 'Installation conditions', 'Power accessories'], specifications: rows([['Mounting / dimensions', 'Confirm exact camera model, mounting surface, bracket dimensions and load.'], ['Environment', 'Specify indoor or outdoor conditions, cable protection and required enclosure rating.'], ['Power / cabling', 'Check compatible power supply or PoE injector, connectors and cable lengths.']]), useCases: ['New camera installations', 'Relocation', 'Replacement accessories'], features: ['Mounting', 'Indoor', 'Outdoor'] }),

  offering({ slug: 'computer-ram', category: 'components', name: 'Computer RAM', productType: 'Memory', summary: 'Choose memory requirements for desktop or laptop upgrades with platform compatibility checked.', keyFacts: ['DDR generation', 'DIMM or SO-DIMM', 'Capacity and speed'], specifications: rows([['DDR / capacity / speed', 'Confirm supported DDR generation, target capacity and supported operating speed.'], ['Form factor', 'Check DIMM or SO-DIMM format and available slots.'], ['Compatibility', 'Provide motherboard or computer model, CPU, existing memory and any ECC requirements.']]), useCases: ['Desktop upgrades', 'Laptop upgrades', 'New computer builds'], features: ['Memory', 'Compatibility check'] }),
  offering({ slug: 'solid-state-drives', category: 'components', name: 'Solid-state drives (SSD)', productType: 'Storage', summary: 'Plan faster or larger storage with the correct interface and physical format.', keyFacts: ['SATA or NVMe', 'Capacity selection', 'Form factor matching'], specifications: rows([['Capacity / endurance', 'Specify usable capacity, expected writes and application workload.'], ['Interface / format', 'Check SATA or NVMe support, PCIe generation, M.2 key and length or drive bay dimensions.'], ['Compatibility', 'Verify motherboard, computer or enclosure support and available connections.']]), useCases: ['System drive upgrades', 'Application storage', 'New builds'], features: ['Storage', 'Compatibility check'] }),
  offering({ slug: 'hard-disk-drives', category: 'components', name: 'Hard disk drives (HDD)', productType: 'Storage', summary: 'Specify bulk storage around capacity, workload and installation requirements.', keyFacts: ['Capacity requirement', 'Interface matching', 'Bay dimensions'], specifications: rows([['Capacity / workload', 'Specify target capacity, workload and performance requirements.'], ['Interface / dimensions', 'Check supported interface, drive size, bay clearance and power connection.'], ['Compatibility', 'Match the drive to the desktop, enclosure or storage system and its supported capacity.']]), useCases: ['Bulk file storage', 'Capacity upgrades', 'Replacement drives'], features: ['Storage', 'Compatibility check'] }),
  offering({ slug: 'processors', category: 'components', name: 'Processors (CPU)', productType: 'Processors', summary: 'Match processing requirements to the motherboard, cooling and software workload.', keyFacts: ['Socket and BIOS', 'Core count planning', 'Cooling requirements'], specifications: rows([['Socket / chipset', 'Verify socket, chipset and BIOS support for the exact processor.'], ['Cores / workload', 'Agree core count and performance needs for the intended applications.'], ['Power / cooling', 'Check processor power requirements, cooler compatibility and case clearance.']]), useCases: ['Desktop builds', 'Workstation planning', 'Compatible platform upgrades'], features: ['CPU socket', 'Compatibility check'] }),
  offering({ slug: 'motherboards', category: 'components', name: 'Motherboards', productType: 'Motherboards', summary: 'Plan the platform that connects your processor, memory, storage and expansion cards.', keyFacts: ['CPU socket', 'Board dimensions', 'Expansion planning'], specifications: rows([['Socket / BIOS', 'Check exact CPU support and required BIOS version.'], ['Memory', 'Specify DDR generation, slots, supported capacity and memory compatibility.'], ['Form factor / dimensions', 'Match board dimensions to case mounting and clearance.'], ['Expansion / interfaces', 'Agree PCIe slots, storage interfaces, USB, networking and power connectors.']]), useCases: ['New computer builds', 'Platform replacement', 'Workstation configuration'], features: ['CPU socket', 'Compatibility check'] }),
  offering({ slug: 'graphics-cards', category: 'components', name: 'Graphics cards (GPU)', productType: 'Graphics', summary: 'Choose graphics requirements for displays, creative applications or compute workloads.', keyFacts: ['Application requirements', 'Case clearance', 'Power connectors'], specifications: rows([['Memory / workload', 'Specify applications, display count and graphics memory requirements.'], ['Interface / dimensions', 'Check PCIe slot support, card length, height, thickness and case clearance.'], ['Power / outputs', 'Confirm required PSU capacity, power connectors and display connections.']]), useCases: ['Creative workstations', 'Multi-display setups', 'Application-specific builds'], features: ['Graphics', 'Compatibility check'] }),
  offering({ slug: 'power-supplies', category: 'components', name: 'Power supplies (PSU)', productType: 'Power & cooling', summary: 'Size a power supply for the complete system and its connection requirements.', keyFacts: ['Wattage sizing', 'Connector check', 'PSU dimensions'], specifications: rows([['Wattage', 'Calculate system power requirements with suitable expansion headroom.'], ['Form factor / dimensions', 'Check PSU format and case depth or clearance.'], ['Connectors / input', 'Confirm motherboard, processor, graphics and drive connections plus local input requirements.']]), useCases: ['New builds', 'Power supply replacement', 'Component upgrade planning'], features: ['Power', 'Compatibility check'] }),
  offering({ slug: 'computer-cooling', category: 'components', name: 'Computer cooling', productType: 'Power & cooling', summary: 'Match processor cooling and case airflow to the hardware and available space.', keyFacts: ['Socket mounting', 'Thermal requirements', 'Case clearance'], specifications: rows([['Compatibility', 'Match CPU socket, mounting hardware and thermal requirements.'], ['Dimensions', 'Check cooler height, radiator support, fan size and memory clearance.'], ['Power / control', 'Confirm fan or pump headers, control interface and available connectors.']]), useCases: ['Cooling replacement', 'Build planning', 'Airflow improvements'], features: ['Cooling', 'Compatibility check'] }),
  offering({ slug: 'cases-and-accessories', category: 'components', name: 'Computer cases & accessories', productType: 'Cases & accessories', summary: 'Choose the enclosure and accessories that fit your complete computer build.', keyFacts: ['Motherboard fit', 'Component clearance', 'Ports and accessories'], specifications: rows([['Form factor / dimensions', 'Check supported motherboard size, enclosure dimensions and placement.'], ['Component clearance', 'Verify GPU length, cooler height, PSU depth, drive bays and airflow.'], ['Accessories / interfaces', 'Specify front-panel ports, cables, adapters and other required accessories; check each interface.']]), useCases: ['New builds', 'Enclosure replacement', 'Computer accessory enquiries'], features: ['Enclosures', 'Compatibility check'] }),
];

export function getProductCategory(slug: string): ProductCategory | undefined {
  return productCategories.find((category) => category.slug === slug);
}

export function getProduct(category: string, slug: string): Product | undefined {
  return products.find((product) => product.category === category && product.slug === slug);
}

export function productHref(product: Product): string {
  return `/products/${product.category}/${product.slug}`;
}

export function productQuoteHref(product: Product): string {
  return `/contact?${new URLSearchParams({ category: product.category, product: product.slug })}`;
}

export interface ProductFilters {
  search: string;
  category: string;
  brand: string;
  productType: string;
  feature: string;
  cameraTier: string;
}

/** Search and selectors deliberately share the same predicate on every listing. */
export function filterProducts(items: Product[], filters: Partial<ProductFilters>): Product[] {
  const terms = (filters.search ?? '').trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const matches = (selected: string | undefined, value: string | undefined) =>
    !selected || selected === 'all' || selected === value;
  return items.filter((product) => {
    const text = [product.name, product.brand, product.productType, product.summary, product.category,
      getProductCategory(product.category)?.title, product.cameraTier, ...product.features,
      ...product.keyFacts, ...product.useCases].join(' ').toLocaleLowerCase();
    return terms.every((term) => text.includes(term)) &&
      matches(filters.category, product.category) &&
      matches(filters.brand, product.brand) &&
      matches(filters.productType, product.productType) &&
      matches(filters.cameraTier, product.cameraTier) &&
      (!filters.feature || filters.feature === 'all' || product.features.includes(filters.feature));
  });
}
