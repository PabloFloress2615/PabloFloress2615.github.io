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
  /** Issuing body, shown under the badge. */
  issuer: string;
  /**
   * Credly badge URL, or TODO_ when the credential is not published on Credly.
   * Oracle and Microsoft issue through their own platforms, not Credly.
   */
  href: string;
  /**
   * Self-hosted badge artwork under public/images/badges/, 320x320.
   * Downloaded from images.credly.com rather than hot-linked so the page makes
   * no third-party requests. Omitted when no badge art is available.
   */
  badge?: string;
  inProgress?: boolean;
};

export const certifications: readonly Certification[] = [
  {
    name: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'The Linux Foundation',
    href: 'https://www.credly.com/badges/37d9f4a6-37ba-4f09-ba07-dc897d7266d8/public_url',
    badge: '/images/badges/cka.png',
  },
  {
    name: 'Kubernetes and Cloud Native Associate (KCNA)',
    issuer: 'The Linux Foundation',
    href: 'https://www.credly.com/badges/c0eaeef0-0384-417f-8fb5-8b60977fd323/public_url',
    badge: '/images/badges/kcna.png',
  },
  {
    name: 'Google Cloud Associate Cloud Engineer',
    issuer: 'Google Cloud',
    href: 'https://www.credly.com/badges/13de4162-8b37-4fa7-8011-6141c180b686/public_url',
    badge: '/images/badges/gcp-ace.png',
  },
  {
    name: 'AWS Solutions Architect \u2013 Associate',
    issuer: 'Amazon Web Services',
    href: 'https://www.credly.com/badges/ae918a6b-9358-45a6-b717-450cf68d4ad8/public_url',
    badge: '/images/badges/aws-saa.png',
  },
  {
    name: 'AWS Security \u2013 Specialty',
    issuer: 'Amazon Web Services',
    href: 'https://www.credly.com/badges/5f2ce083-90ed-4d23-9ea3-e08e5967a5ad/public_url',
    badge: '/images/badges/aws-scs.png',
  },
  {
    name: 'HashiCorp Terraform Associate',
    issuer: 'HashiCorp',
    href: 'https://www.credly.com/badges/9ccf7a9e-6bc7-428b-b2dc-f368ae0f0083/public_url',
    badge: '/images/badges/terraform-associate.png',
  },
  {
    name: 'Oracle Cloud Multicloud Architect Professional',
    issuer: 'Oracle',
    // Oracle issues through its own CertView, not Credly.
    href: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=EE63424739957BF893C99F5AD042E6327AE14C03396BA556A89B0FC96ACACC24',
    badge: '/images/badges/oracle-multicloud.png',
  },
  {
    name: 'Microsoft Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft',
    // Microsoft issues through Microsoft Learn, not Credly.
    href: 'https://learn.microsoft.com/api/credentials/share/es-es/PabloFlores-7917/7F0945D2B97BD9C8?sharingId=303CCA1E8CC86DEB',
    badge: '/images/badges/az900.svg',
  },
];

export const certificationsInProgress: readonly Certification[] = [
  {
    name: 'Google Cloud Professional Cloud Architect',
    issuer: 'Google Cloud',
    href: '',
    inProgress: true,
  },
  {
    name: 'Certified Kubernetes Security Specialist (CKS)',
    issuer: 'The Linux Foundation',
    href: '',
    inProgress: true,
  },
];

/** A placeholder or empty link should not be clickable — it goes nowhere. */
export const isPlaceholder = (href: string): boolean => href === '' || href.startsWith('TODO_');
