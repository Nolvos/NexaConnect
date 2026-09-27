import type { IconName } from '@/components/Icon';

export type SolutionFamily = 'Avaya Enterprise' | 'Verint' | 'Call accounting';

export interface SolutionSource {
  title: string;
  url: string;
  checkedOn: string;
}

export interface EnterpriseSolution {
  slug: string;
  name: string;
  shortName: string;
  family: SolutionFamily;
  icon: IconName;
  image: { src: string; alt: string };
  summary: string;
  overview: string;
  capabilities: string[];
  useCases: string[];
  integration: string[];
  serviceScope: string[];
  lifecycle: { label: string; detail: string; legacy?: boolean };
  sources: SolutionSource[];
}

const checkedOn = '2026-09-26';
const source = (title: string, url: string): SolutionSource => ({ title, url, checkedOn });

export const solutionFamilies: Array<{ name: SolutionFamily; id: string; description: string }> = [
  { name: 'Avaya Enterprise', id: 'avaya', description: 'Call control, central administration, application integration and a path forward for existing recording systems.' },
  { name: 'Verint', id: 'verint', description: 'Workforce planning and the wider recording, quality and performance tools used by contact centre teams.' },
  { name: 'Call accounting', id: 'call-accounting', description: 'Understand telephone usage, reporting and departmental costs with an integration scoped to your system.' },
];

/**
 * Capabilities are solution offerings, never evidence of completed projects.
 * Sources verify vendor product descriptions, not Nexa Connect accreditation.
 * Recheck release, licensing and lifecycle details for each proposed deployment.
 */
export const solutions: EnterpriseSolution[] = [
  {
    slug: 'avaya-communication-manager',
    name: 'Avaya Aura Communication Manager',
    shortName: 'Communication Manager (CM)',
    family: 'Avaya Enterprise',
    icon: 'PhoneCall',
    image: { src: '/catalogue/solution-cm-v2.png', alt: 'Illustrative image of a generic enterprise desk phone beside communications equipment' },
    summary: 'Enterprise call control, dial plans and routing for connected offices and contact centres.',
    overview: 'Communication Manager is the call-processing foundation of Avaya Aura. It provides central call control for compatible gateways and analogue, digital and IP endpoints, with routing and communications features for distributed organisations.',
    capabilities: ['Call processing and intelligent call routing', 'Connectivity for supported SIP, H.323 and other endpoint types', 'Conferencing, mobility and contact centre features, subject to configuration and licensing'],
    useCases: ['A consistent extension and routing plan across several sites', 'Changes to an existing Aura estate or a planned platform migration', 'Connecting business telephony with contact centre workflows'],
    integration: ['Review Communication Manager, Session Manager and System Manager release compatibility together.', 'Confirm supported gateways, endpoints, carrier interfaces and application dependencies before a change.', 'Check capacity, licences, infrastructure and resilience requirements against the selected release.'],
    serviceScope: ['Discovery, architecture and dial-plan planning', 'Installation and configuration within an agreed implementation scope', 'Migration preparation, call-flow testing and handover', 'Maintenance assessment and troubleshooting for the installed environment'],
    lifecycle: { label: 'Release-specific assessment', detail: 'Communication Manager remains part of Avaya’s Aura portfolio. Support eligibility depends on the installed release, infrastructure and contract; an older installation is not automatically covered by the current product offering.' },
    sources: [source('Avaya: Communication Manager overview', 'https://documentation.avaya.com/en-us/home/bundle/communication-manager/communicationmanagerpos_r10-2-x/communication-manager-overview.html'), source('Avaya Aura platform', 'https://www.avaya.com/en/products/aura/')],
  },
  {
    slug: 'avaya-system-manager',
    name: 'Avaya Aura System Manager',
    shortName: 'System Manager (SMGR)',
    family: 'Avaya Enterprise',
    icon: 'ServerCog',
    image: { src: '/catalogue/solution-smgr-v2.png', alt: 'Illustrative image of server racks and an abstract central management terminal' },
    summary: 'Central administration for supported Aura applications, users and system management tasks.',
    overview: 'System Manager provides a shared, browser-based management console for supported Avaya Aura components. It brings provisioning and administration into one place and can connect with enterprise identity and directory services.',
    capabilities: ['Shared administration and user provisioning', 'A common console with single sign-on for supported Aura applications', 'Software deployment, migration and update management for compatible components'],
    useCases: ['A central administration workflow for a multi-component Aura estate', 'More consistent user provisioning and directory integration', 'Preparing management services for an Aura upgrade'],
    integration: ['System Manager (SMGR) handles administration; Session Manager handles SIP session routing.', 'Review component versions, DNS, time synchronisation and certificate trust before deployment.', 'Scope directory integration, administrator roles and backup arrangements to the customer environment.'],
    serviceScope: ['Installation planning and configuration review', 'User, directory and management workflow configuration', 'Certificate and provisioning troubleshooting', 'Upgrade planning, maintenance checks and administrator handover'],
    lifecycle: { label: 'Release-specific assessment', detail: 'System Manager is a current Aura platform component. Check the installed release and its dependencies against Avaya lifecycle notices and the customer’s support entitlement before committing to an upgrade or support scope.' },
    sources: [source('Avaya: System Manager overview', 'https://documentation.avaya.com/en-us/home/bundle/avaya-aura/planningfordeploying_r10-2-x/avaya-aura-core-components/system-manager-overview.html'), source('Avaya: System Manager documentation', 'https://documentation.avaya.com/en-us/home/bundle/system-manager/administeringavayaaurasystemmanagerr102x/resources/Documentation_Admin_SMGR.html'), source('Avaya Aura platform', 'https://www.avaya.com/en/products/aura/')],
  },
  {
    slug: 'avaya-aes',
    name: 'Avaya Aura Application Enablement Services',
    shortName: 'Application Enablement Services (AES)',
    family: 'Avaya Enterprise',
    icon: 'Plug',
    image: { src: '/catalogue/solution-aes-v2.png', alt: 'Illustrative image of a generic telephony gateway, interface cards, cables and desk phone' },
    summary: 'Connect business applications with Communication Manager through supported telephony interfaces.',
    overview: 'Application Enablement Services exposes telephony interfaces for applications working with Communication Manager. Interfaces such as TSAPI, JTAPI and DMCC support different call-control, device and media needs; the required interface is chosen for the application.',
    capabilities: ['Computer telephony integration through supported APIs and SDKs', 'Call-control events for compatible business applications', 'Device and media integration using DMCC where supported and licensed'],
    useCases: ['CRM call-control or screen-pop integration', 'Connecting a compatible recording application', 'Diagnosing an existing CTI application connection'],
    integration: ['Match AES, Communication Manager, client SDK and third-party application versions.', 'Confirm Communication Manager and AES feature licences for the chosen interface and concurrency.', 'Review application permissions, certificates, network access and vendor interoperability evidence.'],
    serviceScope: ['Integration discovery and interface selection', 'Installation, application connectivity and configuration assistance', 'Functional testing and migration coordination', 'Troubleshooting CTI links, permissions and application events'],
    lifecycle: { label: 'Release-specific assessment', detail: 'Avaya publishes AES 10.2 documentation and interface licensing requirements. This does not establish support for an older AES release or every third-party application; check the exact versions and entitlements for each engagement.' },
    sources: [source('Avaya: AE Services interfaces and management', 'https://documentation.avaya.com/en-us/home/bundle/application-enablement-services/administeringaeservices_r10-2-x/out-of-band-management.html'), source('Avaya: AE Services licensing summary', 'https://documentation.avaya.com/en-us/home/bundle/application-enablement-services/aesoverviewandspec_r10-2-x/ae-services-licensing-summary.html'), source('Avaya: Application Enablement Services clients and SDKs', 'https://documentation.avaya.com/en-us/home/bundle/application-enablement-services/aesoverviewandspec_r10-2-x/application-enablement-services-client-and-sdks.html')],
  },
  {
    slug: 'avaya-contact-recorder',
    name: 'Avaya Contact Recorder',
    shortName: 'Contact Recorder (ACR)',
    family: 'Avaya Enterprise',
    icon: 'Disc3',
    image: { src: '/catalogue/solution-acr-v2.png', alt: 'Illustrative image of a generic recording appliance and archived storage drives' },
    summary: 'Assessment, recording continuity and migration planning for existing legacy ACR installations.',
    overview: 'Avaya Contact Recorder (ACR), sometimes described as Avaya Call Recorder, is a legacy recording product. Start with the exact installed product and version so that recording access, retention and migration requirements can be assessed correctly.',
    capabilities: ['Review existing call capture and recording retrieval workflows', 'Assess the recording database, archives and retention configuration', 'Plan continuity of access when replacing or retiring a recorder'],
    useCases: ['An existing recorder with missing or incomplete recordings', 'Preparing to replace a legacy recording environment', 'Retaining access to historic calls during a migration'],
    integration: ['Identify the recorder release, telephony platform, recording method and dependent interfaces.', 'Review storage, backup, encryption-key access and required retention before moving data.', 'Agree recording and playback acceptance checks for the proposed replacement.'],
    serviceScope: ['Existing-system assessment and fault investigation', 'Configuration and archive-access review within the agreed scope', 'Migration and replacement planning', 'Recording continuity checks and operational handover'],
    lifecycle: { label: 'Legacy · migration planning', legacy: true, detail: 'Avaya’s lifecycle notice lists end of sale for WFO 15.1 and the WFO 15.2 ACR feature, with manufacturer software support ending on 31 October 2021 and 30 April 2022 respectively. These are distinct from any services-support dates. Confirm the installed product, release and contract; current manufacturer support is not assumed. Contact Recorder Advanced is a separate feature option.' },
    sources: [source('Avaya: WFO / Contact Recorder feature end-of-sale notice', 'https://support.avaya.com/css/public/documents/101063074'), source('Avaya: Contact Recorder maintenance guidance', 'https://support.avaya.com/public/index?id=soln213294&page=content')],
  },
  {
    slug: 'verint-wfm',
    name: 'Verint Workforce Management',
    shortName: 'Workforce Management (WFM)',
    family: 'Verint',
    icon: 'CalendarClock',
    image: { src: '/catalogue/solution-wfm-v2.png', alt: 'Illustrative image of a workforce planning schedule, clock, headset and tablet' },
    summary: 'Demand forecasting, staffing schedules and operational visibility for workforce planning.',
    overview: 'Verint Workforce Management helps teams forecast demand, plan staffing and build schedules around skills, work rules and availability. The implementation starts with the quality of the source data and the way your operation measures demand.',
    capabilities: ['Forecasting and capacity planning', 'Scheduling across work types, skills and availability', 'Intraday visibility and schedule-adherence workflows', 'Employee schedule access and request workflows where licensed'],
    useCases: ['Contact centre forecasting and roster planning', 'Reviewing staffing requirements against service goals', 'Giving supervisors a clearer view of planned and actual activity'],
    integration: ['Validate historical and real-time feeds from the contact centre platform.', 'Agree agent identities, skills, work rules, time zones and reporting intervals.', 'Recording, quality management and advanced automation are separate capabilities to verify in the purchased package.'],
    serviceScope: ['Requirements and data-readiness review', 'Deployment and integration planning', 'Forecast, schedule and operational configuration', 'Migration checks, user handover and scoped troubleshooting'],
    lifecycle: { label: 'Package and version dependent', detail: 'Verint markets Workforce Management today, but cloud and installed versions differ. Confirm deployment model, connectors, licensed modules and support eligibility for the proposed environment.' },
    sources: [source('Verint Workforce Management', 'https://www.verint.com/workforce-management-software-wfm-solutions/'), source('Verint forecasting and scheduling', 'https://www.verint.com/workforce-management-software-wfm-solutions/forecasting-and-scheduling/')],
  },
  {
    slug: 'verint-wfo',
    name: 'Verint Workforce Optimization',
    shortName: 'Workforce Optimization (WFO)',
    family: 'Verint',
    icon: 'ChartNoAxesCombined',
    image: { src: '/catalogue/solution-wfo-v2.png', alt: 'Illustrative image of a headset and abstract call quality review on a tablet' },
    summary: 'Bring recording, quality reviews, workforce planning and performance analysis into a defined scope.',
    overview: 'Workforce Optimization describes a suite of capabilities rather than one universally included licence. Verint’s WFO portfolio brings together workforce management, interaction recording, quality management and performance tools for contact centre operations.',
    capabilities: ['Interaction recording and retrieval with a compatible recording integration', 'Quality evaluations to identify coaching opportunities', 'Workforce planning through WFM', 'Scorecards and dashboards for individual and team performance'],
    useCases: ['Creating a consistent interaction-review and coaching process', 'Connecting quality findings with operational performance', 'Reviewing an existing recording and workforce environment before an upgrade'],
    integration: ['Verify telephony, recording and workforce connectors for the exact platform releases.', 'Define recording access, retention, evaluation forms and reporting responsibilities.', 'Speech analytics, automated quality tools and other extensions require separate feature and licence verification.'],
    serviceScope: ['Module and integration discovery', 'Implementation and recording-workflow configuration planning', 'Quality, reporting and performance workflow configuration', 'Migration assessment, maintenance review and fault investigation'],
    lifecycle: { label: 'Module and version dependent', detail: 'WFO remains a Verint solution category. Product names, modules and delivery models vary by generation; an existing WFO licence does not establish entitlement to every current Verint capability.' },
    sources: [source('Verint: Workforce Optimization in contact centres', 'https://www.verint.com/workforce-optimization-wfo-in-contact-centers/')],
  },
  {
    slug: 'call-accounting-billing',
    name: 'Call accounting & billing',
    shortName: 'Call accounting & RingMaster',
    family: 'Call accounting',
    icon: 'FileChartColumn',
    image: { src: '/catalogue/solution-billing-v2.png', alt: 'Illustrative image of a desk phone, calculator and abstract call-cost reports' },
    summary: 'Call usage reports, departmental cost allocation and a review of existing RingMaster environments.',
    overview: 'Turn call-detail records into usable reporting on telephone activity and costs. Scope the reporting rules, department structure and tariffs around your business. Official Soft-ex and Avaya documentation identifies RingMaster as a Soft-ex call accounting product.',
    capabilities: ['Call-detail reporting and usage analysis', 'Departmental reporting and cost allocation requirements', 'Review of call patterns and operational reporting needs', 'Assessment of an existing Soft-ex RingMaster installation'],
    useCases: ['Allocating telephone usage to departments or cost centres', 'Reviewing site and extension activity', 'Checking data collection and reporting during a PBX migration'],
    integration: ['Avaya application notes document RingMaster 6.1 with Communication Manager 8.1 using a TCP/IP CDR feed.', 'That test is version-specific and does not establish compatibility with other releases or platforms.', 'Confirm CDR format, data transport, tariff rules, department mappings and current vendor support before implementation.'],
    serviceScope: ['Requirements and existing-product identification', 'Call-record collection and integration assessment', 'Reporting, department mapping and cost-rule configuration within the agreed scope', 'Migration planning and investigation of missing or inconsistent call records'],
    lifecycle: { label: 'Installed-product review', detail: 'RingMaster naming is verified through Soft-ex and Avaya documentation. Current availability, licensing and support for a particular release need confirmation before a proposal. Share the product name and version from your installation when enquiring.' },
    sources: [source('Soft-ex: RingMaster 6.1 announcement', 'https://www.soft-ex.net/post/soft-ex-launch-next-generation-of-ringmaster-to-manage-changes-in-work-practices-post-covid'), source('Avaya: RingMaster 6.1 / Communication Manager 8.1 application notes', 'https://support.avaya.com/css/public/documents/101078142'), source('Soft-ex: communications analytics and cost allocation', 'https://www.soft-ex.net/')],
  },
];

/** Internal editorial follow-up; deliberately not rendered as a vendor claim. */
export const solutionContentReview = {
  checkedOn,
  requestedBillingNames: ['Softix', 'RingMaster'],
  verifiedVendor: 'Soft-ex',
  verifiedProduct: 'RingMaster',
  status: 'needs-owner-confirmation' as const,
  note: 'Official sources verify Soft-ex RingMaster. Confirm whether the user-supplied name Softix means Soft-ex or a separate product before publishing a Softix-branded offering. Do not silently alias Softix to Soft-ex.',
};

export function getSolution(slug: string): EnterpriseSolution | undefined {
  return solutions.find((solution) => solution.slug === slug);
}
