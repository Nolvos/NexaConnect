import {
  Activity,
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Award,
  BellRing,
  Blocks,
  Building2,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Clock,
  Cloud,
  Code,
  Database,
  Gauge,
  GitBranch,
  Globe,
  Handshake,
  Headset,
  Layers,
  LayoutTemplate,
  LifeBuoy,
  Lock,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  Network,
  Palette,
  PenTool,
  Phone,
  Plug,
  Quote,
  Radio,
  RefreshCw,
  Rocket,
  Route,
  Search,
  Send,
  Server,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  TrendingUp,
  Users,
  Workflow,
  Wrench,
  X,
  Zap,
  type LucideProps,
} from 'lucide-react';

/**
 * Curated icon map.
 *
 * Icons live behind a string key so icon choices can sit in plain data
 * (`lib/site.ts`, page content arrays) and still cross the server/client
 * boundary - React cannot serialise a component reference as a prop.
 */
const icons = {
  Activity,
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Award,
  BellRing,
  Blocks,
  Building2,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Clock,
  Cloud,
  Code,
  Database,
  Gauge,
  GitBranch,
  Globe,
  Handshake,
  Headset,
  Layers,
  LayoutTemplate,
  LifeBuoy,
  Lock,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  Network,
  Palette,
  PenTool,
  Phone,
  Plug,
  Quote,
  Radio,
  RefreshCw,
  Rocket,
  Route,
  Search,
  Send,
  Server,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  TrendingUp,
  Users,
  Workflow,
  Wrench,
  X,
  Zap,
} as const;

export type IconName = keyof typeof icons;

interface IconProps extends LucideProps {
  name: IconName;
}

/**
 * All icons render at a consistent 1.75 stroke so the outline family reads as
 * one set. Size is set by the caller in px via `size`, defaulting to 24.
 */
export default function Icon({ name, strokeWidth = 1.75, ...props }: IconProps) {
  const Glyph = icons[name];
  return <Glyph strokeWidth={strokeWidth} aria-hidden="true" {...props} />;
}
