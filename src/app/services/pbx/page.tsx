import type { Metadata } from 'next';

import Button from '@/components/Button';
import CTABand from '@/components/CTABand';
import CheckList from '@/components/CheckList';
import Icon, { type IconName } from '@/components/Icon';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import Steps from '@/components/Steps';
import Tabs from '@/components/Tabs';

export const metadata: Metadata = {
  title: 'PBX solutions: Avaya, Mitel, Zoom Phone and Genesys',
  description:
    'On-premise, cloud and contact centre telephony. Avaya, Mitel, Zoom Phone and Genesys Cloud CX implementation, configuration and installation across the UAE.',
};

/*
 * CONTENT NOTE: the platform material below describes each vendor's general
 * deployment model only - the kind of thing published on the vendors' own
 * product pages. It contains no pricing, no capacity figures and no claimed
 * partner tier or certification. Do not add any of those without written
 * confirmation from the vendor.
 */

const platforms: Array<{
  name: string;
  model: string;
  icon: IconName;
  summary: string;
  points: string[];
}> = [
  {
    name: 'Avaya',
    model: 'On-premise / hybrid',
    icon: 'Server',
    summary:
      'Long-established business telephony you run yourself. Best when the sites are fixed and you want the call control in the building.',
    points: [
      'IP Office for single and multi-branch businesses, Aura for large estates',
      'Hybrid options where some sites stay on-premise and others move to cloud',
      'Keeps existing handsets and cabling in play where they are still good',
      'Call control stays inside your network, which some compliance regimes prefer',
    ],
  },
  {
    name: 'Mitel',
    model: 'On-premise / virtual / hybrid',
    icon: 'Server',
    summary:
      'Flexible call control that runs on appliances, virtual servers or a mix. A common choice for hotels and multi-site operators.',
    points: [
      'MiVoice Office 400 for smaller sites, MiVoice Business for larger estates',
      'Runs on dedicated hardware or virtualised on servers you already own',
      'Hospitality features: room status, wake-up calls and PMS integration',
      'SIP desk phones, DECT handsets for floors and warehouses, and softphones',
    ],
  },
  {
    name: 'Zoom Phone',
    model: 'Cloud',
    icon: 'Cloud',
    summary:
      'Telephony delivered as a service. Best when people move between desk, home and mobile and you would rather not own a PBX at all.',
    points: [
      'Cloud-native, so there is no PBX hardware to house, power or replace',
      'Connected to a UAE-licensed carrier through Bring Your Own Carrier',
      'Same client on desk phone, desktop and mobile for hybrid teams',
      'Per-user licensing that follows headcount up and down',
    ],
  },
  {
    name: 'Genesys Cloud CX',
    model: 'Cloud contact centre',
    icon: 'Headset',
    summary:
      'A contact centre platform rather than a PBX. It sits alongside your phone system and handles every customer conversation in one place.',
    points: [
      'Voice, WhatsApp, web chat and email in one agent desktop',
      'IVR and routing built in Architect, with Arabic and English prompts',
      'Screen-pop and interaction logging against your CRM',
      'Works alongside Avaya, Mitel or Zoom Phone rather than replacing them',
    ],
  },
];

const stages = [
  {
    id: 'implementation',
    label: 'Implementation',
    intro:
      'Before anything is ordered, we work out what your call flow actually is, not what the org chart says it is.',
    steps: [
      {
        title: 'Discovery and call-flow audit',
        body: 'We map how calls reach people today: main numbers, hunt groups, out-of-hours, the extension everyone knows to dial instead of the official one.',
      },
      {
        title: 'Sizing and licensing',
        body: 'Concurrent calls, seat counts and which users genuinely need which features. This is where most quotes get padded. We would rather right-size it.',
      },
      {
        title: 'Design sign-off',
        body: 'You get the proposed dial plan, routing and hardware list in writing, and approve it before anything is purchased.',
      },
      {
        title: 'Migration and number porting plan',
        body: 'Porting dates with your carrier, fallback arrangements and a defined cutover window, so nobody discovers the switch by missing a call.',
      },
    ],
  },
  {
    id: 'configuration',
    label: 'Configuration',
    intro: 'The part that decides whether the system feels right on day one or fights you for a year.',
    steps: [
      {
        title: 'Dial plan and extensions',
        body: 'Numbering that makes sense to your staff, with room to grow without renumbering everyone later.',
      },
      {
        title: 'Call routing and IVR',
        body: 'Menus, queues, overflow and out-of-hours behaviour in Arabic and English, built to be short, because callers hate long menus.',
      },
      {
        title: 'Voicemail, presence and recording',
        body: 'Configured per team, including any call recording your sector requires and where those recordings are stored.',
      },
      {
        title: 'Integrations',
        body: 'Connecting the phone system or Genesys to your CRM or helpdesk so calls land against the right record automatically.',
      },
      {
        title: 'Handover pack',
        body: 'Dial plan, credentials, diagrams and a short admin guide, handed to you at the end. Yours to keep.',
      },
    ],
  },
  {
    id: 'installation',
    label: 'Installation',
    intro: 'On-site work, scheduled around your business hours rather than ours.',
    steps: [
      {
        title: 'Site survey',
        body: 'Cabling, patching, power and comms room checked before install day, so nothing surfaces as a surprise mid-cutover.',
      },
      {
        title: 'Network preparation',
        body: 'PoE capacity, VLAN separation and QoS for voice traffic. Most call-quality complaints trace back to this step being skipped.',
      },
      {
        title: 'Handset provisioning',
        body: 'Phones configured, labelled and placed at the right desks, so staff find their own extension already working.',
      },
      {
        title: 'Cutover',
        body: 'Numbers moved during an agreed window with a tested rollback, not a hope.',
      },
      {
        title: 'Floor-walking and training',
        body: 'We stay on site after go-live for the questions that only appear once people start using it for real.',
      },
    ],
  },
];

const comparison = [
  {
    label: 'Deployment model',
    avaya: 'On-premise or hybrid, with hardware in your building or data centre.',
    mitel: 'Appliance, virtual server or hybrid, on infrastructure you control.',
    zoom: 'Cloud service, with nothing to host on your side.',
  },
  {
    label: 'Scaling',
    avaya: 'Scales in hardware and licence steps; plan capacity ahead.',
    mitel: 'Licence-based growth; virtual deployments add capacity without new boxes.',
    zoom: 'Scales per user licence, up or down, without hardware changes.',
  },
  {
    label: 'Cost shape',
    avaya: 'Weighted toward upfront capital, then maintenance.',
    mitel: 'Upfront capital, lighter where existing servers can host it.',
    zoom: 'Weighted toward predictable monthly per-user cost.',
  },
  {
    label: 'Handsets',
    avaya: 'Works with supported desk-phone estates you may already own.',
    mitel: 'SIP desk phones and DECT for roaming staff.',
    zoom: 'Softphone-first; supported desk phones optional.',
  },
  {
    label: 'Ideal use case',
    avaya: 'Fixed sites, existing Avaya investment, or a preference for keeping call control in-house.',
    mitel: 'Hotels, warehouses and multi-site operators who want on-premise control with virtual flexibility.',
    zoom: 'Distributed or hybrid teams who want one client across desk, laptop and mobile.',
  },
];

export default function PbxPage() {
  return (
    <>
      <PageHero
        eyebrow="PBX solutions"
        title="A phone system sized for how your team actually calls"
        lead="On-premise, cloud, or a mix of the two. We implement, configure and install Avaya, Mitel, Zoom Phone and Genesys Cloud CX, then stay on to keep it running."
      >
        <Button href="/contact" variant="accent" icon="ArrowRight">
          Book a PBX assessment
        </Button>
        <Button href="#compare" variant="outlineDark">
          Compare the options
        </Button>
      </PageHero>

      {/* ---------------- Platforms ---------------- */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="First decision"
            title="On-premise or cloud? It depends on your sites, not on fashion"
            lead="Cloud telephony suits distributed teams and unpredictable headcount. On-premise still wins where sites are fixed, the handset estate is sound, or call control has to stay inside your own network. Plenty of businesses end up running both, with Genesys on top for the contact centre."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {platforms.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08} className="h-full">
                <div className="flex h-full flex-col rounded-card border border-line bg-white p-7 shadow-card">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-control bg-mist">
                      <Icon name={p.icon} size={21} className="text-signal-deep" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-pine">{p.name}</h3>
                      <p className="font-mono text-[0.6875rem] uppercase tracking-label text-ink-soft">
                        {p.model}
                      </p>
                    </div>
                  </div>
                  <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-soft">{p.summary}</p>
                  <CheckList items={p.points} className="mt-6" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Delivery stages ---------------- */}
      <section className="border-y border-line bg-mist py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="How we deliver"
            title="Three stages, in this order, every time"
            lead="Skipping ahead is how projects end up with a working phone system that nobody can use. Each stage has a sign-off before the next one starts."
          />

          <Reveal className="mt-12">
            <Tabs
              items={stages.map((stage) => ({
                id: stage.id,
                label: stage.label,
                content: (
                  <div>
                    <p className="mb-9 max-w-prose text-[1.0625rem] leading-relaxed text-ink-soft">
                      {stage.intro}
                    </p>
                    <Steps steps={stage.steps} />
                  </div>
                ),
              }))}
            />
          </Reveal>
        </div>
      </section>

      {/* ---------------- Comparison ---------------- */}
      <section id="compare" className="bg-paper py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Side by side"
            title="Avaya vs Mitel vs Zoom Phone"
            lead="A starting point, not a verdict. Which one fits depends on your sites, your existing hardware and how much of your team is in the building on a given day."
          />

          <Reveal className="mt-12">
            {/* Wide table scrolls inside its own container rather than the page. */}
            <div className="overflow-x-auto rounded-card border border-line bg-white shadow-card">
              <table className="w-full min-w-[52rem] border-collapse text-left">
                <caption className="sr-only">
                  Comparison of Avaya, Mitel and Zoom Phone across deployment, scaling, cost shape,
                  handsets and ideal use case
                </caption>
                <thead>
                  <tr className="border-b border-line bg-mist">
                    <th scope="col" className="w-[9rem] px-5 py-4 font-mono text-[0.6875rem] uppercase tracking-label text-ink-soft">
                      &nbsp;
                    </th>
                    {['Avaya', 'Mitel', 'Zoom Phone'].map((name) => (
                      <th
                        key={name}
                        scope="col"
                        className="px-5 py-4 font-display text-[0.9375rem] font-semibold text-pine"
                      >
                        {name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.label} className="border-b border-line last:border-0">
                      <th
                        scope="row"
                        className="px-5 py-4 align-top font-mono text-[0.6875rem] uppercase tracking-label text-signal-deep"
                      >
                        {row.label}
                      </th>
                      {[row.avaya, row.mitel, row.zoom].map((cell, i) => (
                        <td
                          key={i}
                          className="px-5 py-4 align-top text-[0.9375rem] leading-relaxed text-ink-soft"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.06} className="mt-6 space-y-3">
            <p className="flex items-start gap-2 text-[0.875rem] text-ink-soft">
              <Icon name="Headset" size={16} className="mt-0.5 shrink-0 text-signal-deep" />
              Running a contact centre? Genesys Cloud CX works on top of any of the three, so the
              phone system decision and the contact centre decision can be made separately.
            </p>
            <p className="flex items-start gap-2 text-[0.875rem] text-ink-soft">
              <Icon name="AlertCircle" size={16} className="mt-0.5 shrink-0 text-signal-deep" />
              Still not obvious? That is normal. A short assessment call usually settles it in
              twenty minutes.
            </p>
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Book a PBX assessment"
        lead="We'll look at your current call flow, site layout and handset estate, then tell you plainly which route makes sense, including when the answer is to keep what you have."
        action="Book a PBX assessment"
      />
    </>
  );
}
