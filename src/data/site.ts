/**
 * Single source of truth for everything that is not case-study prose.
 *
 * Anything marked TODO_ is a placeholder: replace the value here and it
 * propagates to the hero, contact section, footer and JSON-LD structured data.
 * `npm run check:todo` lists every one that is still unfilled. It is a
 * pre-launch gate, not part of the build or deploy.
 */

export const site = {
  name: 'Pablo Flores',
  title: 'Cloud & DevOps Engineer',
  titleLong: 'Cloud & DevOps Engineer — GCP · AWS · Azure · Kubernetes',
  location: 'Guatemala City (GMT-6)',
  locationLine: 'Based in Guatemala City (GMT-6), full overlap with US Central time.',
  description:
    'Pablo Flores — Cloud & DevOps Engineer specialising in infrastructure as code, Kubernetes and observability across Google Cloud, AWS, Azure and hybrid on-premises platforms.',
  about:
    'Pablo is a Cloud and DevOps Engineer with 5+ years of experience designing, automating and operating enterprise infrastructure on Google Cloud, AWS, Azure and hybrid on-premises platforms. He specializes in infrastructure as code, Kubernetes and observability, building infrastructure that is reproducible, secure and easy to operate.',
  email: 'pablodfflores34@gmail.com',
  ogImage: '/images/og-default.png',
} as const;

export const links = {
  github: 'https://github.com/PabloFloress2615',
  linkedin: 'https://www.linkedin.com/in/pablo-david-flores-flores-5b1365239/',
  credly: 'https://www.credly.com/users/pablo-flores.729eed63',
  toptal: 'https://www.toptal.com/developers/resume/pablo-david-flores-flores#Wao9W7',
} as const;

/** Links rendered in the contact section and footer, in order. */
export const contactLinks = [
  { label: 'Email', value: site.email, href: `mailto:${site.email}` },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/pablo-david-flores-flores',
    href: links.linkedin,
  },
  { label: 'GitHub', value: 'github.com/PabloFloress2615', href: links.github },
  { label: 'Credly', value: 'credly.com/users/pablo-flores', href: links.credly },
  { label: 'Toptal', value: 'Vetted Toptal profile', href: links.toptal },
] as const;

export const skillGroups = [
  {
    name: 'Cloud',
    items: ['Google Cloud', 'AWS', 'Microsoft Azure', 'VMware / hybrid'],
  },
  {
    name: 'IaC & automation',
    items: ['Terraform', 'Ansible', 'Packer', 'Helm', 'GitHub Actions', 'GitOps (Flux)'],
  },
  {
    name: 'Containers',
    items: ['Kubernetes (GKE, EKS)', 'Docker', 'OPA Gatekeeper', 'NetworkPolicies', 'HPA'],
  },
  {
    name: 'Observability',
    items: ['Prometheus', 'Grafana', 'Grafana Alloy', 'Datadog', 'CloudWatch'],
  },
  {
    name: 'Security & networking',
    items: [
      'IAM / RBAC',
      'Secrets management',
      'VPC design',
      'Load balancing',
      'Firewall rules',
    ],
  },
] as const;

export type Certification = {
  name: string;
  /** Credly badge URL. Placeholder until the real badge link is filled in. */
  href: string;
  inProgress?: boolean;
};

export const certifications: readonly Certification[] = [
  { name: 'Certified Kubernetes Administrator (CKA)', href: 'TODO_CREDLY_BADGE_CKA' },
  { name: 'Kubernetes and Cloud Native Associate (KCNA)', href: 'TODO_CREDLY_BADGE_KCNA' },
  { name: 'Google Cloud Associate Cloud Engineer', href: 'TODO_CREDLY_BADGE_GCP_ACE' },
  { name: 'AWS Solutions Architect – Associate', href: 'TODO_CREDLY_BADGE_AWS_SAA' },
  { name: 'AWS Security – Specialty', href: 'TODO_CREDLY_BADGE_AWS_SCS' },
  { name: 'HashiCorp Terraform Associate', href: 'TODO_CREDLY_BADGE_TERRAFORM' },
  {
    name: 'Oracle Cloud Multicloud Architect Professional',
    href: 'TODO_CREDLY_BADGE_OCI_MULTICLOUD',
  },
  { name: 'Microsoft Azure Fundamentals (AZ-900)', href: 'TODO_CREDLY_BADGE_AZ900' },
];

export const certificationsInProgress: readonly Certification[] = [
  {
    name: 'Google Cloud Professional Cloud Architect',
    href: 'TODO_CREDLY_BADGE_GCP_PCA',
    inProgress: true,
  },
  {
    name: 'Certified Kubernetes Security Specialist (CKS)',
    href: 'TODO_CREDLY_BADGE_CKS',
    inProgress: true,
  },
];

/** A placeholder link should not be clickable — it goes nowhere. */
export const isPlaceholder = (href: string): boolean => href.startsWith('TODO_');
