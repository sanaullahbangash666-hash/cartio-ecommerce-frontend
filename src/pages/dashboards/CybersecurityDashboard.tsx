import React, { useState } from 'react';
import {
  Shield,
  Globe,
  Terminal,
  Activity,
  AlertTriangle,
  FileText,
  Play,
  Square,
  RotateCcw,
  Download,
  Info,
  Network,
  Cpu,
  Layers,
  Lock,
  Unlock,
  Radio,
  Eye,
  Flame,
  CheckCircle2,
  XCircle,
  Send,
  Copy,
  RefreshCw,
  Search,
  Database,
  Server,
  Zap,
  Ban,
  Sliders,
  ChevronRight,
  ExternalLink,
  Code2,
} from 'lucide-react';
import {
  ScanRecord,
  VulnerabilityItem,
  SecurityReport,
  VulnerabilitySeverity,
  NmapPort,
  NmapScanResult,
  MetasploitModule,
  MetasploitExecutionLog,
  BurpInterceptItem,
  IdsAlert,
  IpsRule,
} from '../../types';
import { cybersecurityService } from '../../services/cybersecurityService';

interface CybersecurityDashboardProps {
  scans: ScanRecord[];
  vulnerabilities: VulnerabilityItem[];
  onRefreshData: () => void;
}

type SecurityTab =
  | 'overview'
  | 'custom_scanner'
  | 'nmap'
  | 'metasploit'
  | 'burpsuite'
  | 'ids'
  | 'ips'
  | 'reports';

export const CybersecurityDashboard: React.FC<CybersecurityDashboardProps> = ({
  scans,
  vulnerabilities,
  onRefreshData,
}) => {
  // Navigation Tabs: Replaced (scanner engine, scan history, vulnerabilities) with (custome scanner, nmap, metasploite, burpsuite, ids, ips)
  const [activeTab, setActiveTab] = useState<SecurityTab>('custom_scanner');

  // ==========================================
  // 1. CUSTOM SCANNER STATE
  // ==========================================
  const [csTargetUrl, setCsTargetUrl] = useState('https://cartio-store.internal');
  const [csTargetIp, setCsTargetIp] = useState('192.168.10.45');
  const [csScanDepth, setCsScanDepth] = useState<'quick' | 'full' | 'aggressive' | 'stealth'>('full');
  const [csPortRange, setCsPortRange] = useState('80,443,3000,8080,8443');
  const [csModules, setCsModules] = useState({
    sslTls: true,
    owaspTop10: true,
    httpHeaders: true,
    sensitiveFiles: true,
    corsXFrame: true,
  });
  const [csIsScanning, setCsIsScanning] = useState(false);
  const [csProgress, setCsProgress] = useState(0);
  const [csTerminalLogs, setCsTerminalLogs] = useState<string[]>([]);
  const [csSeverityFilter, setCsSeverityFilter] = useState<string>('All');

  // ==========================================
  // 2. NMAP STATE
  // ==========================================
  const [nmapTarget, setNmapTarget] = useState('192.168.10.45');
  const [nmapPreset, setNmapPreset] = useState<string>('-sS -sV -O');
  const [nmapCustomArgs, setNmapCustomArgs] = useState('');
  const [nmapIsScanning, setNmapIsScanning] = useState(false);
  const [nmapProgress, setNmapProgress] = useState(0);
  const [nmapFilter, setNmapFilter] = useState<'all' | 'open' | 'risky'>('all');
  const [nmapResult, setNmapResult] = useState<NmapScanResult>({
    target: '192.168.10.45',
    command: 'nmap -sS -sV -O 192.168.10.45',
    status: 'completed',
    latency: '0.42 ms',
    osGuess: 'Linux 5.15 (Ubuntu 22.04 LTS / Alpine 3.19 Container)',
    macAddress: '02:42:AC:11:00:02 (Docker Virtual Bridge)',
    scannedAt: new Date().toLocaleTimeString(),
    rawLog: [
      'Starting Nmap 7.94 ( https://nmap.org ) at 2026-10-10 10:45 UTC',
      'NSE: Loaded 156 scripts for scanning.',
      'Initiating ARP Ping Scan at 10:45:01',
      'Completed ARP Ping Scan at 10:45:01, 0.00s elapsed (1 total hosts)',
      'Initiating Parallel DNS resolution of 1 host. at 10:45:01',
      'Completed Parallel DNS resolution of 1 host. at 10:45:01, 0.00s elapsed',
      'Initiating SYN Stealth Scan at 10:45:01',
      'Scanning 192.168.10.45 [1000 ports]',
      'Discovered open port 80/tcp on 192.168.10.45',
      'Discovered open port 443/tcp on 192.168.10.45',
      'Discovered open port 22/tcp on 192.168.10.45',
      'Discovered open port 3306/tcp on 192.168.10.45',
      'Discovered open port 6379/tcp on 192.168.10.45',
      'Discovered open port 8080/tcp on 192.168.10.45',
      'Completed SYN Stealth Scan at 10:45:02, 1.14s elapsed (1000 total ports)',
      'Initiating Service scan at 10:45:02',
      'Scanning 6 services on 192.168.10.45',
      'Completed Service scan at 10:45:04, 2.12s elapsed (6 services on 1 host)',
      'Initiating OS detection (try 1) against 192.168.10.45',
      'Retrying OS detection (try 2) against 192.168.10.45',
      'Nmap scan report for cartio-prod-edge.internal (192.168.10.45)',
      'Host is up (0.00042s latency).',
      'Nmap done: 1 IP address (1 host up) scanned in 3.68 seconds',
    ],
    ports: [
      { port: 22, protocol: 'tcp', state: 'open', service: 'ssh', version: 'OpenSSH 9.2p1 Debian-2+deb12u2 (protocol 2.0)', risk: 'low' },
      { port: 80, protocol: 'tcp', state: 'open', service: 'http', version: 'nginx/1.25.3 (Redirects to HTTPS)', risk: 'low' },
      { port: 443, protocol: 'tcp', state: 'open', service: 'ssl/https', version: 'nginx TLS 1.3 (Cartio Store Frontend)', risk: 'low' },
      { port: 3306, protocol: 'tcp', state: 'open', service: 'mysql', version: 'MySQL Community Server 8.0.35', risk: 'high' },
      { port: 6379, protocol: 'tcp', state: 'open', service: 'redis', version: 'Redis key-value store 7.2.1', risk: 'medium' },
      { port: 8080, protocol: 'tcp', state: 'filtered', service: 'http-proxy', version: 'Envoy internal proxy v1.28', risk: 'medium' },
      { port: 8443, protocol: 'tcp', state: 'closed', service: 'https-alt', version: 'Connection refused', risk: 'low' },
    ],
  });

  // ==========================================
  // 3. METASPLOIT STATE
  // ==========================================
  const metasploitModules: MetasploitModule[] = [
    {
      id: 'msf-01',
      name: 'Cartio Token HMAC Timing Verification Probe',
      type: 'exploit',
      path: 'exploit/multi/http/cartio_auth_bypass',
      rank: 'Excellent',
      description: 'Tests session JWT signature verification against subtle non-constant-time cryptographic comparison leaks.',
      cve: 'CVE-2024-38192',
      defaultPort: 443,
      author: 'RedTeam-Ops / rapid7',
      safeCheck: true,
    },
    {
      id: 'msf-02',
      name: 'SSL/TLS Insecure Cipher Suite & 0-RTT Enumeration',
      type: 'auxiliary',
      path: 'auxiliary/scanner/http/ssl_version',
      rank: 'Normal',
      description: 'Discovers active SSLv3, TLS 1.0/1.1 fallbacks, weak RC4/DES ciphers, and unvalidated 0-RTT anti-replay support.',
      cve: 'CVE-2020-0601',
      defaultPort: 443,
      author: 'hdm, todd',
      safeCheck: true,
    },
    {
      id: 'msf-03',
      name: 'Sensitive Directory & Hidden Config Crawler',
      type: 'auxiliary',
      path: 'auxiliary/scanner/http/dir_scanner',
      rank: 'Normal',
      description: 'Scans for exposed .env, .git/HEAD, backups, admin consoles, and swagger documentation leaks.',
      defaultPort: 443,
      author: 'et, Christian Mehlmauer',
      safeCheck: true,
    },
    {
      id: 'msf-04',
      name: 'Node.js Express Prototype Pollution Checker',
      type: 'exploit',
      path: 'exploit/linux/http/node_prototype_pollution',
      rank: 'Great',
      description: 'Sends controlled JSON object payloads to test recursively merged express request bodies.',
      cve: 'CVE-2023-45133',
      defaultPort: 3000,
      author: 'posix, RedTeam',
      safeCheck: true,
    },
    {
      id: 'msf-05',
      name: 'Slowloris HTTP Connection Starvation Resilience Probe',
      type: 'auxiliary',
      path: 'auxiliary/dos/http/slowloris_defense_test',
      rank: 'Good',
      description: 'Audits keep-alive timeout behavior and client header buffer limits without service disruption.',
      cve: 'CVE-2007-6750',
      defaultPort: 80,
      author: 'RSnake, Hansen',
      safeCheck: true,
    },
    {
      id: 'msf-06',
      name: 'Time-Based Blind SQL Injection Payload Tester',
      type: 'auxiliary',
      path: 'auxiliary/scanner/sql/blind_injection',
      rank: 'Great',
      description: 'Audits catalog search filter query parameters for sleep() timing delay vulnerabilities.',
      cve: 'CWE-89',
      defaultPort: 443,
      author: 'Bernardo Damele',
      safeCheck: true,
    },
  ];

  const [selectedModule, setSelectedModule] = useState<MetasploitModule>(metasploitModules[0]);
  const [msfRhost, setMsfRhost] = useState('192.168.10.45');
  const [msfRport, setMsfRport] = useState('443');
  const [msfSsl, setMsfSsl] = useState(true);
  const [msfPayload, setMsfPayload] = useState('generic/shell_reverse_tcp');
  const [msfLhost, setMsfLhost] = useState('10.10.14.8');
  const [msfLport, setMsfLport] = useState('4444');
  const [msfIsExecuting, setMsfIsExecuting] = useState(false);
  const [msfConsoleLogs, setMsfConsoleLogs] = useState<MetasploitExecutionLog[]>([
    { timestamp: '10:40:12', text: 'msf6 > use exploit/multi/http/cartio_auth_bypass', type: 'info' },
    { timestamp: '10:40:13', text: '[*] Using configured module exploit/multi/http/cartio_auth_bypass', type: 'info' },
    { timestamp: '10:40:14', text: 'msf6 exploit(multi/http/cartio_auth_bypass) > set RHOSTS 192.168.10.45', type: 'info' },
    { timestamp: '10:40:14', text: 'RHOSTS => 192.168.10.45', type: 'info' },
    { timestamp: '10:40:15', text: 'msf6 exploit(multi/http/cartio_auth_bypass) > check', type: 'info' },
    { timestamp: '10:40:16', text: '[*] 192.168.10.45:443 - Initiating non-destructive constant-time comparison test...', type: 'info' },
    { timestamp: '10:40:17', text: '[+] 192.168.10.45:443 - The target service uses crypto.timingSafeEqual(). Not vulnerable.', type: 'success' },
    { timestamp: '10:40:17', text: '[*] Exploit check complete: Target fortified.', type: 'success' },
  ]);

  // ==========================================
  // 4. BURP SUITE STATE
  // ==========================================
  const [burpSubTab, setBurpSubTab] = useState<'proxy' | 'repeater' | 'intruder' | 'sitemap'>('proxy');
  const [burpInterceptActive, setBurpInterceptActive] = useState(true);
  const [burpHistory, setBurpHistory] = useState<BurpInterceptItem[]>([
    {
      id: 'req-01',
      method: 'POST',
      url: '/api/checkout/process',
      host: 'cartio-store.internal',
      path: '/api/checkout/process',
      statusCode: 200,
      rawHeaders: `POST /api/checkout/process HTTP/2\nHost: cartio-store.internal\nUser-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)\nContent-Type: application/json\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.demo\nX-Cartio-Client-Version: 2.4.0\nOrigin: https://cartio-store.internal`,
      requestBody: JSON.stringify(
        {
          cartId: 'cart-session-982',
          items: [{ sku: 'CARTIO-VELOX-RED', qty: 1, price: 220 }],
          couponCode: 'SPRING15',
          paymentNonce: 'tok_visa_4242',
        },
        null,
        2
      ),
      responseHeaders: `HTTP/2 200 OK\nDate: Sat, 10 Oct 2026 10:45:00 GMT\nContent-Type: application/json; charset=utf-8\nStrict-Transport-Security: max-age=31536000; includeSubDomains\nX-Content-Type-Options: nosniff\nContent-Security-Policy: default-src 'self'`,
      responseBody: JSON.stringify(
        {
          orderId: 'ORD-2026-9921',
          status: 'Confirmed',
          subtotal: 220,
          discount: 33,
          chargedTotal: 187,
          antiFraudScore: 0.02,
        },
        null,
        2
      ),
      contentType: 'application/json',
      timestamp: '10:44:32',
      intercepted: true,
    },
    {
      id: 'req-02',
      method: 'GET',
      url: '/api/products/search?q=runner',
      host: 'cartio-store.internal',
      path: '/api/products/search?q=runner',
      statusCode: 200,
      rawHeaders: `GET /api/products/search?q=runner HTTP/2\nHost: cartio-store.internal\nAccept: application/json`,
      requestBody: '',
      responseHeaders: `HTTP/2 200 OK\nContent-Type: application/json\nX-RateLimit-Remaining: 59`,
      responseBody: JSON.stringify({ count: 4, results: ['prod-01', 'prod-04'] }),
      contentType: 'application/json',
      timestamp: '10:43:10',
      intercepted: false,
    },
  ]);
  const [selectedBurpItem, setSelectedBurpItem] = useState<BurpInterceptItem>(burpHistory[0]);
  const [burpRepeaterRequest, setBurpRepeaterRequest] = useState<string>(burpHistory[0].rawHeaders + '\n\n' + burpHistory[0].requestBody);
  const [burpRepeaterResponse, setBurpRepeaterResponse] = useState<string>(burpHistory[0].responseHeaders + '\n\n' + burpHistory[0].responseBody);
  const [burpRepeaterLatency, setBurpRepeaterLatency] = useState<number>(34);
  const [burpRepeaterStatusCode, setBurpRepeaterStatusCode] = useState<number>(200);

  // ==========================================
  // 5. IDS (INTRUSION DETECTION SYSTEM) STATE
  // ==========================================
  const [idsAlerts, setIdsAlerts] = useState<IdsAlert[]>([
    {
      id: 'ids-01',
      timestamp: '10:45:12',
      ruleSid: 2018959,
      category: 'SQL Injection Probing',
      signature: 'ET WEB_SERVER Possible SQL Injection Attempt (UNION SELECT in URI)',
      sourceIp: '198.51.100.77',
      destIp: '192.168.10.45',
      sourcePort: 51244,
      destPort: 443,
      protocol: 'HTTP',
      severity: 'Critical',
      payloadHex: '2f 61 70 69 2f 63 61 74 61 6c 6f 67 3f 71 3d 27 20 55 4e 49 4f 4e 20 53 45 4c 45 43 54 20 31 2c 75 73 65 72 6e 61 6d 65 2c 70 61 73 73 77 6f 72 64 20 46 52 4f 4d 20 61 64 6d 69 6e 73 2d 2d',
      payloadAscii: "GET /api/catalog?q=' UNION SELECT 1,username,password FROM admins-- HTTP/1.1",
      status: 'New',
    },
    {
      id: 'ids-02',
      timestamp: '10:44:03',
      ruleSid: 2024102,
      category: 'Credential Stuffing / Brute Force',
      signature: 'ET POLICY High Frequency Auth Failures Threshold Exceeded (>15 / 60s)',
      sourceIp: '203.0.113.19',
      destIp: '192.168.10.45',
      sourcePort: 43900,
      destPort: 443,
      protocol: 'TLS',
      severity: 'High',
      payloadHex: '70 6f 73 74 20 2f 61 70 69 2f 61 75 74 68 2f 6c 6f 67 69 6e 20 7b 22 75 73 65 72 22 3a 22 61 64 6d 69 6e 22 7d',
      payloadAscii: 'POST /api/auth/login {"email":"admin@cartio.com","password":"***"} [Attempt 17]',
      status: 'Escalated',
    },
    {
      id: 'ids-03',
      timestamp: '10:41:50',
      ruleSid: 2009210,
      category: 'Reconnaissance / Port Scan',
      signature: 'GPL SCAN PING Nmap Scripting Engine Probe User-Agent',
      sourceIp: '45.33.32.156',
      destIp: '192.168.10.45',
      sourcePort: 60100,
      destPort: 80,
      protocol: 'TCP',
      severity: 'Medium',
      payloadHex: '55 73 65 72 2d 41 67 65 6e 74 3a 20 4e 6d 61 70 20 53 63 72 69 70 74 69 6e 67 20 45 6e 67 69 6e 65',
      payloadAscii: 'GET / HTTP/1.1\\r\\nUser-Agent: Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)',
      status: 'Investigating',
    },
    {
      id: 'ids-04',
      timestamp: '10:38:22',
      ruleSid: 2031089,
      category: 'Path Traversal Attempt',
      signature: 'ET WEB_SPECIFIC_APPS Directory Traversal Pattern (../../etc/passwd)',
      sourceIp: '198.51.100.89',
      destIp: '192.168.10.45',
      sourcePort: 38810,
      destPort: 443,
      protocol: 'HTTP',
      severity: 'High',
      payloadHex: '2f 64 6f 77 6e 6c 6f 61 64 3f 66 69 6c 65 3d 2e 2e 2f 2e 2e 2f 2e 2e 2f 65 74 63 2f 70 61 73 73 77 64',
      payloadAscii: 'GET /download?file=../../../../etc/passwd HTTP/2',
      status: 'Investigating',
    },
    {
      id: 'ids-05',
      timestamp: '10:35:05',
      ruleSid: 2011984,
      category: 'Cross-Site Scripting (XSS)',
      signature: 'ET WEB_SERVER Reflected XSS Probe (<script>tag in search string)',
      sourceIp: '192.0.2.14',
      destIp: '192.168.10.45',
      sourcePort: 55430,
      destPort: 443,
      protocol: 'HTTP',
      severity: 'Medium',
      payloadHex: '3c 73 63 72 69 70 74 3e 61 6c 65 72 74 28 31 29 3c 2f 73 63 72 69 70 74 3e',
      payloadAscii: 'GET /search?q=<script>alert(document.cookie)</script> HTTP/2',
      status: 'Dismissed',
    },
  ]);
  const [selectedIdsAlert, setSelectedIdsAlert] = useState<IdsAlert | null>(idsAlerts[0]);

  // ==========================================
  // 6. IPS (INTRUSION PREVENTION SYSTEM) STATE
  // ==========================================
  const [ipsInlineMode, setIpsInlineMode] = useState<boolean>(true);
  const [ipsAutoRateLimit, setIpsAutoRateLimit] = useState<boolean>(true);
  const [ipsWafDropSqli, setIpsWafDropSqli] = useState<boolean>(true);
  const [ipsBruteJail, setIpsBruteJail] = useState<boolean>(true);
  const [ipsSynCookie, setIpsSynCookie] = useState<boolean>(true);

  const [ipsBannedList, setIpsBannedList] = useState<IpsRule[]>([
    {
      id: 'rule-01',
      ip: '198.51.100.77',
      reason: 'Automated SQL Injection Exploit Dropped (Triggered SID 2018959)',
      blockedAt: '10:45:12',
      duration: 'Permanent',
      status: 'Active',
      droppedPackets: 248,
      threatType: 'SQLi Exploit',
    },
    {
      id: 'rule-02',
      ip: '203.0.113.19',
      reason: 'Fail2Ban Brute Force Jail: 17 rapid failed credential attempts',
      blockedAt: '10:44:03',
      duration: '24 Hours',
      status: 'Active',
      droppedPackets: 612,
      threatType: 'Credential Stuffing',
    },
    {
      id: 'rule-03',
      ip: '45.33.32.156',
      reason: 'Aggressive Port Scanner & Automated Web Crawler Sweeper',
      blockedAt: '10:41:50',
      duration: '1 Hour',
      status: 'Active',
      droppedPackets: 1420,
      threatType: 'Reconnaissance',
    },
    {
      id: 'rule-04',
      ip: '198.51.100.89',
      reason: 'Directory Traversal Arbitrary File Read Exploit Dropped',
      blockedAt: '10:38:22',
      duration: '24 Hours',
      status: 'Active',
      droppedPackets: 89,
      threatType: 'Path Traversal',
    },
  ]);

  const [manualIpInput, setManualIpInput] = useState('');
  const [manualReasonInput, setManualReasonInput] = useState('');
  const [manualDurationInput, setManualDurationInput] = useState<'1 Hour' | '24 Hours' | '7 Days' | 'Permanent'>('24 Hours');

  // Reports
  const [generatedReport, setGeneratedReport] = useState<SecurityReport | null>(null);

  // ==========================================
  // CUSTOM SCANNER LOGIC
  // ==========================================
  const startCustomScan = async (type: 'URL' | 'IP') => {
    setCsIsScanning(true);
    setCsProgress(10);
    const target = type === 'URL' ? csTargetUrl : csTargetIp;
    setCsTerminalLogs([
      `[${new Date().toLocaleTimeString()}] [*] Initializing Custom Security Scanner on target: ${target}`,
      `[${new Date().toLocaleTimeString()}] [*] Configured Scan Profile: ${csScanDepth.toUpperCase()} | Port Range: ${csPortRange}`,
      `[${new Date().toLocaleTimeString()}] [*] Resolving DNS A/AAAA and TLS SNI handshakes...`,
    ]);

    setTimeout(() => {
      setCsProgress(40);
      setCsTerminalLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] [+] TCP socket connected. Handshake RTT: 0.38ms`,
        `[${new Date().toLocaleTimeString()}] [*] Auditing TLS 1.3 cryptographic suites: ChaCha20-Poly1305, AES-256-GCM (Passed)`,
        `[${new Date().toLocaleTimeString()}] [*] Inspecting HTTP Security Response Headers (HSTS, CSP, X-Frame-Options, CORS)...`,
      ]);
    }, 600);

    setTimeout(() => {
      setCsProgress(75);
      setCsTerminalLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] [!] Notice: Strict-Transport-Security preload tag recommendation verified.`,
        `[${new Date().toLocaleTimeString()}] [*] Probing OWASP Top 10 input reflection vectors (SQLi, XSS, SSRF, Deserialization)...`,
        `[${new Date().toLocaleTimeString()}] [+] Checkout payload tokenization: HMAC-SHA256 integrity verified.`,
      ]);
    }, 1200);

    setTimeout(async () => {
      setCsProgress(100);
      if (type === 'URL') {
        await cybersecurityService.scanURL(csTargetUrl);
      } else {
        await cybersecurityService.scanIP(csTargetIp);
      }
      setCsTerminalLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] [+] Custom audit complete. Findings synchronized to threat repository.`,
      ]);
      setCsIsScanning(false);
      onRefreshData();
    }, 1800);
  };

  const stopCustomScan = () => {
    setCsIsScanning(false);
    setCsProgress(0);
    setCsTerminalLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] [!] Audit cancelled by operator.`]);
  };

  const clearCustomLogs = () => {
    setCsProgress(0);
    setCsTerminalLogs([]);
  };

  // ==========================================
  // NMAP SCAN LOGIC
  // ==========================================
  const runNmapScan = () => {
    setNmapIsScanning(true);
    setNmapProgress(15);
    const activeCommand = nmapCustomArgs.trim() ? `nmap ${nmapCustomArgs.trim()} ${nmapTarget}` : `nmap ${nmapPreset} ${nmapTarget}`;

    setNmapResult((prev) => ({
      ...prev,
      target: nmapTarget,
      command: activeCommand,
      status: 'scanning',
      rawLog: [
        `Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toISOString()}`,
        `Initiating Parallel DNS resolution of 1 host at ${new Date().toLocaleTimeString()}`,
        `Scanning target ${nmapTarget}...`,
      ],
    }));

    setTimeout(() => {
      setNmapProgress(60);
      setNmapResult((prev) => ({
        ...prev,
        rawLog: [
          ...prev.rawLog,
          `Initiating SYN Stealth Scan against ${nmapTarget} [1000 ports]`,
          `Discovered open port 80/tcp (http)`,
          `Discovered open port 443/tcp (https)`,
          `Discovered open port 22/tcp (ssh)`,
          `Discovered open port 3306/tcp (mysql)`,
          `Discovered open port 6379/tcp (redis)`,
          `Initiating Service scan against open ports...`,
        ],
      }));
    }, 800);

    setTimeout(() => {
      setNmapProgress(100);
      setNmapIsScanning(false);
      setNmapResult((prev) => ({
        ...prev,
        status: 'completed',
        scannedAt: new Date().toLocaleTimeString(),
        rawLog: [
          ...prev.rawLog,
          `Service scan completed: 6 services detected`,
          `OS detection completed: Linux 5.15 (Ubuntu 22.04 LTS / Alpine 3.19)`,
          `Nmap done: 1 IP address (1 host up) scanned in 2.14 seconds`,
        ],
      }));
    }, 1600);
  };

  // ==========================================
  // METASPLOIT LOGIC
  // ==========================================
  const runMetasploitAction = (action: 'check' | 'exploit') => {
    setMsfIsExecuting(true);
    const time = new Date().toLocaleTimeString();
    const newLogs: MetasploitExecutionLog[] = [
      { timestamp: time, text: `msf6 > use ${selectedModule.path}`, type: 'info' },
      { timestamp: time, text: `msf6 ${selectedModule.type}(${selectedModule.path}) > set RHOSTS ${msfRhost}`, type: 'info' },
      { timestamp: time, text: `RHOSTS => ${msfRhost}`, type: 'info' },
      { timestamp: time, text: `msf6 ${selectedModule.type}(${selectedModule.path}) > set RPORT ${msfRport}`, type: 'info' },
      { timestamp: time, text: `RPORT => ${msfRport}`, type: 'info' },
      { timestamp: time, text: `msf6 ${selectedModule.type}(${selectedModule.path}) > ${action}`, type: 'info' },
      { timestamp: time, text: `[*] ${msfRhost}:${msfRport} - Dispatching probe payload...`, type: 'info' },
    ];
    setMsfConsoleLogs((prev) => [...prev, ...newLogs]);

    setTimeout(() => {
      setMsfIsExecuting(false);
      const doneTime = new Date().toLocaleTimeString();
      if (action === 'check') {
        setMsfConsoleLogs((prev) => [
          ...prev,
          {
            timestamp: doneTime,
            text: `[+] ${msfRhost}:${msfRport} - Target verified: Security boundary is defensive. No remote execution vector found.`,
            type: 'success',
          },
          { timestamp: doneTime, text: `[*] Check complete: Service fortified.`, type: 'success' },
        ]);
      } else {
        setMsfConsoleLogs((prev) => [
          ...prev,
          {
            timestamp: doneTime,
            text: `[*] ${msfRhost}:${msfRport} - Diagnostic exploit payload executed in safe-sandbox mode.`,
            type: 'warn',
          },
          {
            timestamp: doneTime,
            text: `[-] ${msfRhost}:${msfRport} - Exploit failed: Server returned 403 Forbidden with security token validation.`,
            type: 'error',
          },
          {
            timestamp: doneTime,
            text: `[+] Zero sessions created. Defense-in-depth policy successfully repelled attack attempt.`,
            type: 'success',
          },
        ]);
      }
    }, 1200);
  };

  // ==========================================
  // BURP SUITE REPEATER
  // ==========================================
  const sendBurpRepeater = () => {
    setBurpRepeaterLatency(Math.floor(25 + Math.random() * 35));
    if (burpRepeaterRequest.includes("' OR 1=1") || burpRepeaterRequest.includes('UNION SELECT')) {
      setBurpRepeaterStatusCode(400);
      setBurpRepeaterResponse(
        `HTTP/2 400 Bad Request\nDate: ${new Date().toUTCString()}\nContent-Type: application/json\nX-WAF-Defense: Triggered\nStrict-Transport-Security: max-age=31536000\n\n{\n  "error": "Illegal SQL character sequence detected in query string",\n  "status": 400,\n  "defenseAction": "BLOCKED_BY_INLINE_WAF"\n}`
      );
    } else if (burpRepeaterRequest.includes('<script>')) {
      setBurpRepeaterStatusCode(403);
      setBurpRepeaterResponse(
        `HTTP/2 403 Forbidden\nDate: ${new Date().toUTCString()}\nContent-Type: application/json\nX-XSS-Protection: 1; mode=block\n\n{\n  "error": "Potentially malicious XSS markup stripped by sanitization filter",\n  "sanitized": true\n}`
      );
    } else {
      setBurpRepeaterStatusCode(200);
      setBurpRepeaterResponse(
        `HTTP/2 200 OK\nDate: ${new Date().toUTCString()}\nContent-Type: application/json; charset=utf-8\nStrict-Transport-Security: max-age=31536000; includeSubDomains\nX-Content-Type-Options: nosniff\n\n{\n  "status": "success",\n  "verified": true,\n  "timestamp": "${new Date().toISOString()}"\n}`
      );
    }
  };

  // ==========================================
  // IDS / IPS BRIDGE ACTION
  // ==========================================
  const handleBlockIdsAlertInIps = (alert: IdsAlert) => {
    // Check if already in banned list
    if (ipsBannedList.some((r) => r.ip === alert.sourceIp)) {
      alertToast(`IP ${alert.sourceIp} is already in the IPS ban registry.`);
      return;
    }
    const newRule: IpsRule = {
      id: `rule-${Date.now()}`,
      ip: alert.sourceIp,
      reason: `Blocked via IDS escalation: ${alert.signature}`,
      blockedAt: new Date().toLocaleTimeString(),
      duration: 'Permanent',
      status: 'Active',
      droppedPackets: 1,
      threatType: alert.category,
    };
    setIpsBannedList([newRule, ...ipsBannedList]);
    setIdsAlerts((prev) =>
      prev.map((a) => (a.id === alert.id ? { ...a, status: 'Escalated' } : a))
    );
    alertToast(`Successfully banned ${alert.sourceIp} in IPS engine!`);
  };

  const handleAddManualIpsRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualIpInput.trim()) return;
    const newRule: IpsRule = {
      id: `rule-${Date.now()}`,
      ip: manualIpInput.trim(),
      reason: manualReasonInput.trim() || 'Manual firewall restriction by security administrator',
      blockedAt: new Date().toLocaleTimeString(),
      duration: manualDurationInput,
      status: 'Active',
      droppedPackets: 0,
      threatType: 'Manual Policy',
    };
    setIpsBannedList([newRule, ...ipsBannedList]);
    setManualIpInput('');
    setManualReasonInput('');
    alertToast(`Firewall block rule active for ${newRule.ip}`);
  };

  const handleUnblockIpsRule = (ruleId: string) => {
    setIpsBannedList((prev) => prev.filter((r) => r.id !== ruleId));
    alertToast('IP address removed from active ban list.');
  };

  const [toastMsg, setToastMsg] = useState('');
  const alertToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  // Reports
  const handleGenerateReport = async () => {
    const report = await cybersecurityService.generateReport('CARTIO Production Platform');
    setGeneratedReport(report);
    setActiveTab('reports');
  };

  const handleDownloadReport = () => {
    const reportData = generatedReport || {
      title: 'Full Spectrum Cybersecurity Audit: CARTIO Platform',
      generatedAt: new Date().toISOString(),
      toolsIncluded: ['Custom Scanner', 'Nmap', 'Metasploit', 'Burp Suite', 'IDS', 'IPS'],
      vulnerabilitiesCount: vulnerabilities.length,
      vulnerabilities,
      nmapScanResult: nmapResult,
      activeIpsRules: ipsBannedList,
      recentIdsAlerts: idsAlerts,
    };
    const jsonStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(reportData, null, 2))}`;
    const dl = document.createElement('a');
    dl.setAttribute('href', jsonStr);
    dl.setAttribute('download', `cartio_cybersecurity_report_${Date.now()}.json`);
    document.body.appendChild(dl);
    dl.click();
    dl.remove();
  };

  const getSeverityBadge = (sev: VulnerabilitySeverity) => {
    switch (sev) {
      case 'Critical':
        return 'bg-red-500/20 text-red-400 border-red-500/40';
      case 'High':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
      case 'Medium':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Low':
        return 'bg-sky-500/20 text-sky-400 border-sky-500/40';
      default:
        return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-zinc-100 py-6 px-3 sm:px-6 max-w-7xl mx-auto selection:bg-red-600 selection:text-white">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-red-950/90 border border-red-700 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header with Cyber Console Branding */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-red-950/50">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-400 font-mono">
              CARTIO SEC-OPS CONSOLE // LEVEL 4 AUTHORIZED
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1 tracking-tight flex items-center gap-3">
            <span>Cybersecurity Intelligence Hub</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-950/80 border border-red-800 text-red-300 font-mono font-normal">
              v4.2.0-SEC
            </span>
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-[#0e0e14] border border-zinc-800 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-300">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>IDS/IPS: Active Inline Filtering</span>
          </div>
          <button
            onClick={handleGenerateReport}
            className="px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.3)] cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Executive Report</span>
          </button>
        </div>
      </div>

      {/* Primary Navigation Tabs: Replaced (scanner engine, scan history, vulnerabilities) with (custome scanner, nmap, metasploite, burpsuite, ids, ips) */}
      <div className="flex overflow-x-auto gap-1.5 mb-8 pb-2 border-b border-zinc-800 text-xs font-semibold no-scrollbar">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'overview'
              ? 'bg-red-600 text-white font-bold shadow-[0_0_12px_rgba(239,68,68,0.4)]'
              : 'text-zinc-400 hover:text-zinc-100 bg-[#0e0e14] hover:bg-[#161620] border border-zinc-800/80'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('custom_scanner')}
          className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'custom_scanner'
              ? 'bg-red-600 text-white font-bold shadow-[0_0_12px_rgba(239,68,68,0.4)]'
              : 'text-zinc-400 hover:text-zinc-100 bg-[#0e0e14] hover:bg-[#161620] border border-zinc-800/80'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 text-red-400" />
          <span>Custom Scanner</span>
        </button>

        <button
          onClick={() => setActiveTab('nmap')}
          className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'nmap'
              ? 'bg-red-600 text-white font-bold shadow-[0_0_12px_rgba(239,68,68,0.4)]'
              : 'text-zinc-400 hover:text-zinc-100 bg-[#0e0e14] hover:bg-[#161620] border border-zinc-800/80'
          }`}
        >
          <Network className="w-3.5 h-3.5 text-sky-400" />
          <span>Nmap</span>
          <span className="text-[10px] bg-sky-950/80 text-sky-300 px-1.5 py-0.2 rounded border border-sky-800/60 font-mono">
            {nmapResult.ports.filter((p) => p.state === 'open').length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('metasploit')}
          className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'metasploit'
              ? 'bg-red-600 text-white font-bold shadow-[0_0_12px_rgba(239,68,68,0.4)]'
              : 'text-zinc-400 hover:text-zinc-100 bg-[#0e0e14] hover:bg-[#161620] border border-zinc-800/80'
          }`}
        >
          <Terminal className="w-3.5 h-3.5 text-amber-400" />
          <span>Metasploit</span>
          <span className="text-[10px] bg-amber-950/80 text-amber-300 px-1.5 py-0.2 rounded border border-amber-800/60 font-mono">
            msf6
          </span>
        </button>

        <button
          onClick={() => setActiveTab('burpsuite')}
          className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'burpsuite'
              ? 'bg-red-600 text-white font-bold shadow-[0_0_12px_rgba(239,68,68,0.4)]'
              : 'text-zinc-400 hover:text-zinc-100 bg-[#0e0e14] hover:bg-[#161620] border border-zinc-800/80'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          <span>Burp Suite</span>
          <span className="text-[10px] bg-orange-950/80 text-orange-300 px-1.5 py-0.2 rounded border border-orange-800/60 font-mono">
            Proxy
          </span>
        </button>

        <button
          onClick={() => setActiveTab('ids')}
          className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'ids'
              ? 'bg-red-600 text-white font-bold shadow-[0_0_12px_rgba(239,68,68,0.4)]'
              : 'text-zinc-400 hover:text-zinc-100 bg-[#0e0e14] hover:bg-[#161620] border border-zinc-800/80'
          }`}
        >
          <Eye className="w-3.5 h-3.5 text-emerald-400" />
          <span>IDS</span>
          <span className="text-[10px] bg-emerald-950/80 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-800/60 font-mono">
            {idsAlerts.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('ips')}
          className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'ips'
              ? 'bg-red-600 text-white font-bold shadow-[0_0_12px_rgba(239,68,68,0.4)]'
              : 'text-zinc-400 hover:text-zinc-100 bg-[#0e0e14] hover:bg-[#161620] border border-zinc-800/80'
          }`}
        >
          <Ban className="w-3.5 h-3.5 text-rose-400" />
          <span>IPS</span>
          <span className="text-[10px] bg-rose-950/80 text-rose-300 px-1.5 py-0.2 rounded border border-rose-800/60 font-mono">
            {ipsBannedList.length} Bans
          </span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'reports'
              ? 'bg-red-600 text-white font-bold shadow-[0_0_12px_rgba(239,68,68,0.4)]'
              : 'text-zinc-400 hover:text-zinc-100 bg-[#0e0e14] hover:bg-[#161620] border border-zinc-800/80'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-zinc-400" />
          <span>Reports</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* TAB 0: OVERVIEW                                            */}
      {/* ========================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#0e0e14] border border-zinc-800/90 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between text-zinc-400 text-xs">
                <span>Threat Posture</span>
                <Shield className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-black text-emerald-400 font-mono mt-2">SECURE</p>
              <p className="text-[11px] text-zinc-500 mt-1">Zero active unmitigated RCE</p>
            </div>

            <div className="bg-[#0e0e14] border border-zinc-800/90 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between text-zinc-400 text-xs">
                <span>IDS Detections</span>
                <Eye className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-2xl font-black text-amber-400 font-mono mt-2">{idsAlerts.length} Triggers</p>
              <p className="text-[11px] text-zinc-500 mt-1">Suricata live signature stream</p>
            </div>

            <div className="bg-[#0e0e14] border border-zinc-800/90 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between text-zinc-400 text-xs">
                <span>IPS Active Blocks</span>
                <Ban className="w-4 h-4 text-red-400" />
              </div>
              <p className="text-2xl font-black text-red-400 font-mono mt-2">{ipsBannedList.length} IPs Banned</p>
              <p className="text-[11px] text-zinc-500 mt-1">Inline WAF drops: 2,369 pkts</p>
            </div>

            <div className="bg-[#0e0e14] border border-zinc-800/90 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between text-zinc-400 text-xs">
                <span>Nmap Open Ports</span>
                <Network className="w-4 h-4 text-sky-400" />
              </div>
              <p className="text-2xl font-black text-sky-400 font-mono mt-2">
                {nmapResult.ports.filter((p) => p.state === 'open').length} Ports Open
              </p>
              <p className="text-[11px] text-zinc-500 mt-1">Edge perimeter verified</p>
            </div>
          </div>

          {/* Quick Tool Selector Matrix */}
          <div className="bg-[#0e0e14] border border-zinc-800/90 rounded-2xl p-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-red-500" />
              <span>Integrated Defense & Audit Tool Matrix</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Tool 1 */}
              <div
                onClick={() => setActiveTab('custom_scanner')}
                className="bg-[#12121c] border border-zinc-800 hover:border-red-600/60 p-4 rounded-xl cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-red-400" />
                    <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">Custom Scanner</h4>
                  </div>
                  <span className="text-[10px] font-mono bg-red-950 text-red-300 px-2 py-0.5 rounded border border-red-800">Ready</span>
                </div>
                <p className="text-xs text-zinc-400 mt-2">Configurable probes, HTTP headers, TLS ciphers, and OWASP Top 10 tests.</p>
              </div>

              {/* Tool 2 */}
              <div
                onClick={() => setActiveTab('nmap')}
                className="bg-[#12121c] border border-zinc-800 hover:border-sky-500/60 p-4 rounded-xl cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Network className="w-4 h-4 text-sky-400" />
                    <h4 className="text-sm font-bold text-white group-hover:text-sky-400 transition-colors">Nmap Engine</h4>
                  </div>
                  <span className="text-[10px] font-mono bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">Port Recon</span>
                </div>
                <p className="text-xs text-zinc-400 mt-2">SYN stealth scan, service version detection, OS fingerprinting, and risk flags.</p>
              </div>

              {/* Tool 3 */}
              <div
                onClick={() => setActiveTab('metasploit')}
                className="bg-[#12121c] border border-zinc-800 hover:border-amber-500/60 p-4 rounded-xl cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-amber-400" />
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">Metasploit Console</h4>
                  </div>
                  <span className="text-[10px] font-mono bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">msf6</span>
                </div>
                <p className="text-xs text-zinc-400 mt-2">Exploit verification modules, safe checks, directory crawlers, and timing audits.</p>
              </div>

              {/* Tool 4 */}
              <div
                onClick={() => setActiveTab('burpsuite')}
                className="bg-[#12121c] border border-zinc-800 hover:border-orange-500/60 p-4 rounded-xl cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">Burp Suite</h4>
                  </div>
                  <span className="text-[10px] font-mono bg-orange-950 text-orange-300 px-2 py-0.5 rounded border border-orange-800">Proxy/Repeater</span>
                </div>
                <p className="text-xs text-zinc-400 mt-2">HTTP interceptor, raw request modification, repeater testing, and site mapping.</p>
              </div>

              {/* Tool 5 */}
              <div
                onClick={() => setActiveTab('ids')}
                className="bg-[#12121c] border border-zinc-800 hover:border-emerald-500/60 p-4 rounded-xl cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">IDS (Suricata)</h4>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">Snort/Suricata</span>
                </div>
                <p className="text-xs text-zinc-400 mt-2">Signature-based detection feed, hex packet inspection, and attack classification.</p>
              </div>

              {/* Tool 6 */}
              <div
                onClick={() => setActiveTab('ips')}
                className="bg-[#12121c] border border-zinc-800 hover:border-rose-500/60 p-4 rounded-xl cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Ban className="w-4 h-4 text-rose-400" />
                    <h4 className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors">IPS (Prevention)</h4>
                  </div>
                  <span className="text-[10px] font-mono bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-800">Inline Filter</span>
                </div>
                <p className="text-xs text-zinc-400 mt-2">Automatic firewall IP banning, rate limiters, SYN cookie defense, and traffic jailing.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 1: CUSTOM SCANNER                                      */}
      {/* ========================================================= */}
      {activeTab === 'custom_scanner' && (
        <div className="space-y-6">
          <div className="bg-[#0e0e14] border border-zinc-800/90 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-red-500" />
                  <span>Custom Vulnerability Scanner Configuration</span>
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Tune target boundaries, specific port targets, and test modules for authorized testing.
                </p>
              </div>
              <span className="text-[10px] font-mono bg-zinc-900 border border-zinc-700 px-2.5 py-1 rounded text-zinc-300">
                Safe Diagnostic Mode Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* URL Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block font-mono">
                  Target URL Endpoint
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
                  <input
                    type="text"
                    value={csTargetUrl}
                    onChange={(e) => setCsTargetUrl(e.target.value)}
                    placeholder="https://cartio-store.internal"
                    className="w-full bg-[#14141e] border border-zinc-700 rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* IP Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block font-mono">
                  Target IP / Hostname
                </label>
                <div className="relative">
                  <Terminal className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
                  <input
                    type="text"
                    value={csTargetIp}
                    onChange={(e) => setCsTargetIp(e.target.value)}
                    placeholder="192.168.10.45"
                    className="w-full bg-[#14141e] border border-zinc-700 rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Scan Profiles & Port Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block font-mono">
                  Scan Depth & Profile
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['quick', 'full', 'aggressive', 'stealth'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setCsScanDepth(mode)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-mono uppercase transition-colors border ${
                        csScanDepth === mode
                          ? 'bg-red-600/30 border-red-500 text-white font-bold'
                          : 'bg-[#14141e] border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block font-mono">
                  Port Target Specification
                </label>
                <input
                  type="text"
                  value={csPortRange}
                  onChange={(e) => setCsPortRange(e.target.value)}
                  placeholder="80,443,3000,8080"
                  className="w-full bg-[#14141e] border border-zinc-700 rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            {/* Test Module Checkboxes */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block font-mono">
                Active Assessment Modules
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs font-mono">
                {Object.entries(csModules).map(([key, enabled]) => (
                  <label
                    key={key}
                    className="flex items-center gap-2 bg-[#14141e] p-2.5 rounded-lg border border-zinc-800 cursor-pointer hover:border-zinc-700 text-zinc-300"
                  >
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={(e) => setCsModules({ ...csModules, [key]: e.target.checked })}
                      className="rounded accent-red-600"
                    />
                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => startCustomScan('URL')}
                disabled={csIsScanning || !csTargetUrl}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg flex items-center gap-2 transition-colors disabled:opacity-40 cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Launch URL Audit</span>
              </button>

              <button
                type="button"
                onClick={() => startCustomScan('IP')}
                disabled={csIsScanning || !csTargetIp}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-lg flex items-center gap-2 transition-colors disabled:opacity-40 cursor-pointer border border-zinc-700"
              >
                <Terminal className="w-3.5 h-3.5 text-red-400" />
                <span>Launch IP Audit</span>
              </button>

              {csIsScanning && (
                <button
                  type="button"
                  onClick={stopCustomScan}
                  className="px-4 py-2 bg-red-950/80 border border-red-700 text-red-300 hover:bg-red-900 text-xs font-bold rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Square className="w-3.5 h-3.5" />
                  <span>Abort Scan</span>
                </button>
              )}

              <button
                type="button"
                onClick={clearCustomLogs}
                className="px-3 py-2 bg-[#14141e] hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold rounded-lg transition-colors border border-zinc-800 cursor-pointer ml-auto"
              >
                <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
                <span>Clear Output</span>
              </button>
            </div>

            {/* Progress & Live Terminal Output */}
            {(csIsScanning || csProgress > 0) && (
              <div className="space-y-3 pt-4 border-t border-zinc-800">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">Scanner Pipeline Progress</span>
                  <span className="text-red-400 font-bold">{csProgress}%</span>
                </div>
                <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-zinc-800">
                  <div
                    className="bg-red-600 h-full transition-all duration-300 shadow-[0_0_8px_#ef4444]"
                    style={{ width: `${csProgress}%` }}
                  />
                </div>

                <div className="bg-[#050508] border border-zinc-800 rounded-xl p-4 font-mono text-[11px] text-zinc-300 max-h-56 overflow-y-auto space-y-1">
                  {csTerminalLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className={
                        log.includes('[+]')
                          ? 'text-emerald-400'
                          : log.includes('[-]') || log.includes('[!]')
                          ? 'text-amber-400'
                          : 'text-zinc-300'
                      }
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Findings Table */}
          <div className="bg-[#0e0e14] border border-zinc-800/90 rounded-2xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span>Custom Scanner Findings ({vulnerabilities.length})</span>
                </h3>
                <p className="text-[11px] text-zinc-400">Identified points for hardening and defense-in-depth</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-zinc-400 font-mono">Severity:</span>
                <select
                  value={csSeverityFilter}
                  onChange={(e) => setCsSeverityFilter(e.target.value)}
                  className="bg-[#14141e] border border-zinc-700 rounded px-2.5 py-1 text-xs text-white font-mono"
                >
                  <option value="All">All</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                  <option value="Informational">Informational</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {vulnerabilities
                .filter((v) => csSeverityFilter === 'All' || v.severity.toLowerCase() === csSeverityFilter.toLowerCase())
                .map((v) => (
                  <div key={v.id} className="bg-[#12121c] border border-zinc-800/80 rounded-xl p-4 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border font-mono ${getSeverityBadge(v.severity)}`}>
                          {v.severity}
                        </span>
                        <h4 className="text-xs font-bold text-white">{v.name}</h4>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                        <span>{new Date(v.timestamp).toLocaleTimeString()}</span>
                        <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px]">
                          {v.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed">{v.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] font-mono">
                      <div className="bg-[#09090e] p-2.5 rounded border border-zinc-800">
                        <span className="text-zinc-500 font-semibold block mb-0.5">Observed Proof</span>
                        <span className="text-zinc-300 break-all">{v.evidence}</span>
                      </div>
                      <div className="bg-red-950/20 p-2.5 rounded border border-red-900/40">
                        <span className="text-red-400 font-semibold block mb-0.5">Hardening Advice</span>
                        <span className="text-zinc-300">{v.recommendation}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: NMAP (NETWORK MAPPER)                               */}
      {/* ========================================================= */}
      {activeTab === 'nmap' && (
        <div className="space-y-6">
          <div className="bg-[#0e0e14] border border-zinc-800/90 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Network className="w-4 h-4 text-sky-400" />
                  <span>Nmap Security Scanner (Network Mapper)</span>
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Host discovery, TCP/UDP port states, service version detection, and OS fingerprinting.
                </p>
              </div>
              <span className="text-[10px] font-mono bg-sky-950 text-sky-300 border border-sky-800 px-2.5 py-1 rounded">
                Nmap v7.94 Engine
              </span>
            </div>

            {/* Target & Preset Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5 md:col-span-1">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block font-mono">
                  Target Host / Subnet
                </label>
                <div className="relative">
                  <Server className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
                  <input
                    type="text"
                    value={nmapTarget}
                    onChange={(e) => setNmapTarget(e.target.value)}
                    placeholder="192.168.10.45"
                    className="w-full bg-[#14141e] border border-zinc-700 rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block font-mono">
                  Scan Profile Arguments
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label: 'SYN Stealth', flag: '-sS -sV -O' },
                    { label: 'Fast Top 100', flag: '-sT --top-ports 100' },
                    { label: 'UDP Critical', flag: '-sU -p 53,123,161' },
                    { label: 'Full Aggressive', flag: '-p- -A -T4' },
                  ].map((p) => (
                    <button
                      key={p.flag}
                      type="button"
                      onClick={() => {
                        setNmapPreset(p.flag);
                        setNmapCustomArgs('');
                      }}
                      className={`py-1.5 px-2 rounded-lg text-xs font-mono transition-colors border text-left ${
                        nmapPreset === p.flag && !nmapCustomArgs
                          ? 'bg-sky-950/60 border-sky-500 text-sky-300 font-bold'
                          : 'bg-[#14141e] border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div className="font-semibold">{p.label}</div>
                      <div className="text-[10px] text-zinc-500 truncate">{p.flag}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Arguments input & command preview */}
            <div className="bg-[#09090f] p-3.5 rounded-xl border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-zinc-300 w-full sm:w-auto">
                <span className="text-sky-400 font-bold">$</span>
                <span className="text-white font-bold">nmap</span>
                <input
                  type="text"
                  value={nmapCustomArgs}
                  onChange={(e) => setNmapCustomArgs(e.target.value)}
                  placeholder={nmapPreset}
                  className="bg-transparent border-b border-zinc-700 px-2 py-0.5 text-sky-300 focus:outline-none focus:border-sky-400 text-xs w-56"
                />
                <span className="text-zinc-400">{nmapTarget}</span>
              </div>

              <button
                type="button"
                onClick={runNmapScan}
                disabled={nmapIsScanning}
                className="w-full sm:w-auto px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-40 cursor-pointer shadow-[0_0_12px_rgba(56,189,248,0.3)] shrink-0"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Execute Nmap</span>
              </button>
            </div>

            {/* Host Fingerprint & Hardware Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#12121c] p-3.5 rounded-xl border border-zinc-800 font-mono text-xs space-y-1">
                <span className="text-zinc-500 text-[10px] uppercase">OS Fingerprint Detection</span>
                <p className="text-white font-semibold">{nmapResult.osGuess}</p>
              </div>
              <div className="bg-[#12121c] p-3.5 rounded-xl border border-zinc-800 font-mono text-xs space-y-1">
                <span className="text-zinc-500 text-[10px] uppercase">Roundtrip Latency</span>
                <p className="text-emerald-400 font-semibold">{nmapResult.latency}</p>
              </div>
              <div className="bg-[#12121c] p-3.5 rounded-xl border border-zinc-800 font-mono text-xs space-y-1">
                <span className="text-zinc-500 text-[10px] uppercase">Interface & MAC Address</span>
                <p className="text-zinc-300 font-semibold">{nmapResult.macAddress}</p>
              </div>
            </div>

            {/* Ports Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-sky-400" />
                  <span>Port & Service Table ({nmapResult.ports.length})</span>
                </h3>

                <div className="flex items-center gap-1.5 text-xs font-mono">
                  {(['all', 'open', 'risky'] as const).map((filterKey) => (
                    <button
                      key={filterKey}
                      onClick={() => setNmapFilter(filterKey)}
                      className={`px-2.5 py-1 rounded capitalize transition-colors ${
                        nmapFilter === filterKey
                          ? 'bg-sky-950 text-sky-300 font-bold border border-sky-800'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {filterKey}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#09090f] border border-zinc-800 rounded-xl overflow-hidden font-mono text-xs">
                <div className="grid grid-cols-12 bg-[#12121c] p-3 text-zinc-400 font-semibold border-b border-zinc-800 text-[11px]">
                  <div className="col-span-2">PORT / PROTO</div>
                  <div className="col-span-2">STATE</div>
                  <div className="col-span-2">SERVICE</div>
                  <div className="col-span-5">VERSION / BANNER DETAILS</div>
                  <div className="col-span-1 text-right">RISK</div>
                </div>

                <div className="divide-y divide-zinc-850">
                  {nmapResult.ports
                    .filter((p) => {
                      if (nmapFilter === 'open') return p.state === 'open';
                      if (nmapFilter === 'risky') return p.risk === 'high' || p.risk === 'medium';
                      return true;
                    })
                    .map((p) => (
                      <div key={p.port} className="grid grid-cols-12 p-3 items-center hover:bg-[#161622] transition-colors">
                        <div className="col-span-2 font-bold text-white">
                          {p.port}/{p.protocol}
                        </div>
                        <div className="col-span-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              p.state === 'open'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : p.state === 'filtered'
                                ? 'bg-amber-950 text-amber-400 border border-amber-800'
                                : 'bg-zinc-800 text-zinc-400'
                            }`}
                          >
                            {p.state}
                          </span>
                        </div>
                        <div className="col-span-2 text-sky-300">{p.service}</div>
                        <div className="col-span-5 text-zinc-300 truncate">{p.version}</div>
                        <div className="col-span-1 text-right">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                              p.risk === 'high'
                                ? 'text-red-400 bg-red-950'
                                : p.risk === 'medium'
                                ? 'text-amber-400 bg-amber-950'
                                : 'text-zinc-400 bg-zinc-900'
                            }`}
                          >
                            {p.risk}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Terminal Raw Stdout */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Nmap Terminal Stdout Output</span>
                <span>{nmapResult.scannedAt}</span>
              </div>
              <div className="bg-[#050508] border border-zinc-800 rounded-xl p-4 font-mono text-[11px] text-zinc-300 max-h-48 overflow-y-auto space-y-1">
                {nmapResult.rawLog.map((line, idx) => (
                  <div key={idx} className={line.includes('Discovered open') ? 'text-emerald-400' : 'text-zinc-300'}>
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: METASPLOIT                                          */}
      {/* ========================================================= */}
      {activeTab === 'metasploit' && (
        <div className="space-y-6">
          <div className="bg-[#0e0e14] border border-zinc-800/90 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span>Metasploit Framework Console (MSF6)</span>
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Authorized exploit checking, auxiliary vulnerability scanners, and penetration verification.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono bg-amber-950 text-amber-300 border border-amber-800 px-2.5 py-1 rounded">
                  msfconsole v6.3.45-dev
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Module List (Left 5 cols) */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>Available Exploit / Auxiliary Modules</span>
                  <span>{metasploitModules.length} Modules</span>
                </div>

                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                  {metasploitModules.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => {
                        setSelectedModule(m);
                        setMsfRport(String(m.defaultPort));
                      }}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedModule.id === m.id
                          ? 'bg-amber-950/30 border-amber-500/80 shadow-md'
                          : 'bg-[#12121c] border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[9px] font-bold uppercase font-mono px-1.5 py-0.5 rounded ${
                            m.type === 'exploit' ? 'bg-red-950 text-red-300' : 'bg-sky-950 text-sky-300'
                          }`}
                        >
                          {m.type}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">{m.rank}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white mt-1.5">{m.name}</h4>
                      <p className="text-[10px] font-mono text-amber-400/90 truncate mt-1">{m.path}</p>
                      {m.cve && (
                        <span className="inline-block mt-1 text-[9px] font-mono bg-zinc-900 text-zinc-400 px-1.5 py-0.2 rounded border border-zinc-800">
                          {m.cve}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Module Configuration & Console Runner (Right 7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-[#12121c] border border-zinc-800 p-4 rounded-xl space-y-3 font-mono text-xs">
                  <h3 className="font-bold text-white text-xs border-b border-zinc-800 pb-2 flex items-center justify-between">
                    <span className="text-amber-300">Module Target Options</span>
                    <span className="text-zinc-500 text-[10px]">{selectedModule.path}</span>
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-1 uppercase">RHOSTS</label>
                      <input
                        type="text"
                        value={msfRhost}
                        onChange={(e) => setMsfRhost(e.target.value)}
                        className="w-full bg-[#09090f] border border-zinc-700 rounded px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-1 uppercase">RPORT</label>
                      <input
                        type="text"
                        value={msfRport}
                        onChange={(e) => setMsfRport(e.target.value)}
                        className="w-full bg-[#09090f] border border-zinc-700 rounded px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-1 uppercase">LHOST (Reverse)</label>
                      <input
                        type="text"
                        value={msfLhost}
                        onChange={(e) => setMsfLhost(e.target.value)}
                        className="w-full bg-[#09090f] border border-zinc-700 rounded px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-1 uppercase">LPORT</label>
                      <input
                        type="text"
                        value={msfLport}
                        onChange={(e) => setMsfLport(e.target.value)}
                        className="w-full bg-[#09090f] border border-zinc-700 rounded px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => runMetasploitAction('check')}
                      disabled={msfIsExecuting}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer border border-zinc-700"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Run Safe Check</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => runMetasploitAction('exploit')}
                      disabled={msfIsExecuting}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-zinc-950 font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-[0_0_12px_rgba(245,158,11,0.3)]"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Execute Module Probe</span>
                    </button>
                  </div>
                </div>

                {/* MSF Console Output Stream */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span>msfconsole stdout terminal stream</span>
                    <span className="text-emerald-400">Active Shells: 0 (Safe)</span>
                  </div>
                  <div className="bg-[#050508] border border-zinc-800 rounded-xl p-4 font-mono text-[11px] max-h-64 overflow-y-auto space-y-1">
                    {msfConsoleLogs.map((log, idx) => (
                      <div
                        key={idx}
                        className={
                          log.type === 'success'
                            ? 'text-emerald-400'
                            : log.type === 'error'
                            ? 'text-red-400'
                            : log.type === 'warn'
                            ? 'text-amber-400'
                            : 'text-zinc-300'
                        }
                      >
                        <span className="text-zinc-600 mr-2">[{log.timestamp}]</span>
                        {log.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: BURP SUITE                                          */}
      {/* ========================================================= */}
      {activeTab === 'burpsuite' && (
        <div className="space-y-6">
          <div className="bg-[#0e0e14] border border-zinc-800/90 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span>Burp Suite Web Security Workbench</span>
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  HTTP proxy interception, Repeater payload dispatch, and target sitemap inspection.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setBurpInterceptActive(!burpInterceptActive)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                    burpInterceptActive
                      ? 'bg-orange-950/80 border-orange-500 text-orange-300 shadow-[0_0_10px_rgba(249,115,22,0.3)]'
                      : 'bg-zinc-900 border-zinc-700 text-zinc-500'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${burpInterceptActive ? 'bg-orange-500 animate-pulse' : 'bg-zinc-600'}`} />
                  <span>Intercept is {burpInterceptActive ? 'ON' : 'OFF'}</span>
                </button>
              </div>
            </div>

            {/* Sub-Tabs: Proxy / Repeater / Intruder / Sitemap */}
            <div className="flex gap-2 border-b border-zinc-800 pb-2 text-xs font-mono">
              {(['proxy', 'repeater', 'sitemap'] as const).map((sub) => (
                <button
                  key={sub}
                  onClick={() => setBurpSubTab(sub)}
                  className={`px-3 py-1.5 rounded-md capitalize transition-colors ${
                    burpSubTab === sub
                      ? 'bg-orange-950 text-orange-300 font-bold border border-orange-800'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>

            {/* Sub-view: PROXY */}
            {burpSubTab === 'proxy' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => alertToast('Forwarded request to origin server')}
                    className="px-3.5 py-1.5 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Forward</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => alertToast('Dropped intercepted request')}
                    className="px-3.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold rounded text-xs transition-colors cursor-pointer border border-zinc-700"
                  >
                    <span>Drop</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setBurpRepeaterRequest(selectedBurpItem.rawHeaders + '\n\n' + selectedBurpItem.requestBody);
                      setBurpSubTab('repeater');
                      alertToast('Transferred to Repeater tab');
                    }}
                    className="px-3.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-orange-300 font-bold rounded text-xs transition-colors cursor-pointer border border-zinc-700 ml-auto"
                  >
                    <span>Send to Repeater &rarr;</span>
                  </button>
                </div>

                {/* Split Pane: Intercepted Request & Response */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="bg-[#09090f] border border-zinc-800 rounded-xl p-4 font-mono text-xs space-y-2">
                    <div className="flex items-center justify-between text-zinc-400 border-b border-zinc-800 pb-1.5">
                      <span className="font-bold text-white">Raw HTTP Request</span>
                      <span className="text-[10px] text-orange-400">{selectedBurpItem.method} {selectedBurpItem.url}</span>
                    </div>
                    <pre className="text-zinc-300 whitespace-pre-wrap text-[11px] leading-relaxed max-h-72 overflow-y-auto">
                      {selectedBurpItem.rawHeaders}
                      {'\n\n'}
                      {selectedBurpItem.requestBody}
                    </pre>
                  </div>

                  <div className="bg-[#09090f] border border-zinc-800 rounded-xl p-4 font-mono text-xs space-y-2">
                    <div className="flex items-center justify-between text-zinc-400 border-b border-zinc-800 pb-1.5">
                      <span className="font-bold text-white">Raw HTTP Response</span>
                      <span className="text-[10px] text-emerald-400">HTTP/2 {selectedBurpItem.statusCode} OK</span>
                    </div>
                    <pre className="text-zinc-300 whitespace-pre-wrap text-[11px] leading-relaxed max-h-72 overflow-y-auto">
                      {selectedBurpItem.responseHeaders}
                      {'\n\n'}
                      {selectedBurpItem.responseBody}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-view: REPEATER */}
            {burpSubTab === 'repeater' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={sendBurpRepeater}
                      className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-[0_0_12px_rgba(249,115,22,0.3)]"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Request</span>
                    </button>
                    <span className="text-xs font-mono text-zinc-400">Response: {burpRepeaterLatency}ms</span>
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        burpRepeaterStatusCode === 200
                          ? 'bg-emerald-950 text-emerald-400'
                          : 'bg-red-950 text-red-400'
                      }`}
                    >
                      {burpRepeaterStatusCode}
                    </span>
                  </div>

                  {/* Quick Injection Payloads */}
                  <div className="flex items-center gap-1 text-[11px] font-mono">
                    <span className="text-zinc-500 mr-1">Inject:</span>
                    <button
                      type="button"
                      onClick={() => setBurpRepeaterRequest((prev) => prev.replace('SPRING15', "' OR 1=1 --"))}
                      className="bg-zinc-800 hover:bg-zinc-700 text-amber-300 px-2 py-1 rounded"
                    >
                      SQLi Payload
                    </button>
                    <button
                      type="button"
                      onClick={() => setBurpRepeaterRequest((prev) => prev.replace('SPRING15', '<script>alert(1)</script>'))}
                      className="bg-zinc-800 hover:bg-zinc-700 text-amber-300 px-2 py-1 rounded"
                    >
                      XSS Probe
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-400 uppercase font-mono block">Editable Request</label>
                    <textarea
                      value={burpRepeaterRequest}
                      onChange={(e) => setBurpRepeaterRequest(e.target.value)}
                      rows={14}
                      className="w-full bg-[#09090f] border border-zinc-700 rounded-xl p-3 text-xs font-mono text-zinc-200 focus:outline-none focus:border-orange-500 leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-400 uppercase font-mono block">Server Response</label>
                    <textarea
                      value={burpRepeaterResponse}
                      readOnly
                      rows={14}
                      className="w-full bg-[#050508] border border-zinc-800 rounded-xl p-3 text-xs font-mono text-emerald-400/90 leading-relaxed select-text"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Sub-view: SITEMAP */}
            {burpSubTab === 'sitemap' && (
              <div className="bg-[#09090f] border border-zinc-800 rounded-xl p-4 font-mono text-xs space-y-3">
                <h3 className="text-xs font-bold text-white border-b border-zinc-800 pb-2">
                  Target Tree & Endpoints (cartio-store.internal)
                </h3>
                <div className="space-y-2 text-zinc-300">
                  <div className="text-sky-400 font-bold">https://cartio-store.internal</div>
                  <div className="pl-4 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-600">&bull;</span>
                      <span className="text-zinc-300">/</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1 rounded">200 OK</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-600">&bull;</span>
                      <span className="text-zinc-300">/api/products</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1 rounded">200 OK</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-600">&bull;</span>
                      <span className="text-zinc-300">/api/checkout/process</span>
                      <span className="text-[10px] text-amber-400 bg-amber-950 px-1 rounded">POST Only / Auth</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-600">&bull;</span>
                      <span className="text-zinc-300">/api/admin/metrics</span>
                      <span className="text-[10px] text-red-400 bg-red-950 px-1 rounded">403 Restricted</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-600">&bull;</span>
                      <span className="text-zinc-300">/.env [Probed]</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1 rounded">404 Protected</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: IDS (INTRUSION DETECTION SYSTEM)                    */}
      {/* ========================================================= */}
      {activeTab === 'ids' && (
        <div className="space-y-6">
          <div className="bg-[#0e0e14] border border-zinc-800/90 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span>Suricata / Snort IDS Sensor Feed</span>
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Deep packet inspection, signature-based anomaly alerts, and threat correlation.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-1 rounded">
                  Sensor State: LISTENING (eth0)
                </span>
              </div>
            </div>

            {/* IDS Alerts Stream */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Active Signature Detections ({idsAlerts.length})</span>
                <span>Rule Engine: Emerging Threats Pro v2026.10</span>
              </div>

              <div className="space-y-3">
                {idsAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    onClick={() => setSelectedIdsAlert(alert)}
                    className={`bg-[#12121c] border rounded-xl p-4 space-y-3 transition-all cursor-pointer ${
                      selectedIdsAlert?.id === alert.id ? 'border-emerald-500 shadow-md' : 'border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono border ${getSeverityBadge(alert.severity)}`}>
                          {alert.severity}
                        </span>
                        <h4 className="text-xs font-bold text-white">{alert.signature}</h4>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-zinc-400">
                          SID: {alert.ruleSid}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBlockIdsAlertInIps(alert);
                          }}
                          className="px-2.5 py-1 bg-red-600/80 hover:bg-red-500 text-white text-[10px] font-bold rounded flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Ban className="w-3 h-3" />
                          <span>Block in IPS</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-zinc-400">
                      <div>
                        <span className="text-zinc-600 block">SOURCE</span>
                        <span className="text-red-400 font-bold">{alert.sourceIp}:{alert.sourcePort}</span>
                      </div>
                      <div>
                        <span className="text-zinc-600 block">TARGET</span>
                        <span className="text-zinc-200">{alert.destIp}:{alert.destPort}</span>
                      </div>
                      <div>
                        <span className="text-zinc-600 block">PROTOCOL</span>
                        <span className="text-sky-300">{alert.protocol}</span>
                      </div>
                      <div>
                        <span className="text-zinc-600 block">TIMESTAMP</span>
                        <span className="text-zinc-300">{alert.timestamp}</span>
                      </div>
                    </div>

                    {/* Decoded packet payload snippet */}
                    <div className="bg-[#09090f] p-2.5 rounded border border-zinc-800 font-mono text-[11px] text-zinc-300 truncate">
                      <span className="text-zinc-500 mr-2">Decoded ASCII:</span>
                      {alert.payloadAscii}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hex Dump Deep Inspection Drawer */}
            {selectedIdsAlert && (
              <div className="bg-[#050508] border border-zinc-800 rounded-xl p-4 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-zinc-400 border-b border-zinc-800 pb-2">
                  <span className="font-bold text-emerald-400">Packet Hex Inspection (SID: {selectedIdsAlert.ruleSid})</span>
                  <span className="text-[10px] text-zinc-500">Source: {selectedIdsAlert.sourceIp}</span>
                </div>
                <div className="text-[11px] text-zinc-400 leading-relaxed break-all bg-[#09090f] p-3 rounded border border-zinc-850">
                  {selectedIdsAlert.payloadHex}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 6: IPS (INTRUSION PREVENTION SYSTEM)                    */}
      {/* ========================================================= */}
      {activeTab === 'ips' && (
        <div className="space-y-6">
          <div className="bg-[#0e0e14] border border-zinc-800/90 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Ban className="w-4 h-4 text-rose-400" />
                  <span>Inline Intrusion Prevention & Firewall Engine</span>
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Automated packet dropping, perimeter IP jailing, and live WAF rate enforcement.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIpsInlineMode(!ipsInlineMode)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                    ipsInlineMode
                      ? 'bg-rose-950/80 border-rose-500 text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                      : 'bg-zinc-900 border-zinc-700 text-zinc-500'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${ipsInlineMode ? 'bg-rose-500 animate-pulse' : 'bg-zinc-600'}`} />
                  <span>Mode: {ipsInlineMode ? 'INLINE (DROP & BLOCK)' : 'PROMISCUOUS (LOG ONLY)'}</span>
                </button>
              </div>
            </div>

            {/* Defense Policies Toggles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div
                onClick={() => setIpsAutoRateLimit(!ipsAutoRateLimit)}
                className={`p-3 rounded-xl border cursor-pointer transition-colors ${
                  ipsAutoRateLimit ? 'bg-[#12121c] border-emerald-600/60' : 'bg-[#0a0a10] border-zinc-800 text-zinc-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Rate Limiter</span>
                  <span className={`text-[10px] ${ipsAutoRateLimit ? 'text-emerald-400' : 'text-zinc-600'}`}>
                    {ipsAutoRateLimit ? 'ON' : 'OFF'}
                  </span>
                </div>
                <p className="text-[10px] text-zinc-400 mt-1">60 req/min per IP threshold</p>
              </div>

              <div
                onClick={() => setIpsWafDropSqli(!ipsWafDropSqli)}
                className={`p-3 rounded-xl border cursor-pointer transition-colors ${
                  ipsWafDropSqli ? 'bg-[#12121c] border-emerald-600/60' : 'bg-[#0a0a10] border-zinc-800 text-zinc-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">WAF SQLi Drop</span>
                  <span className={`text-[10px] ${ipsWafDropSqli ? 'text-emerald-400' : 'text-zinc-600'}`}>
                    {ipsWafDropSqli ? 'ON' : 'OFF'}
                  </span>
                </div>
                <p className="text-[10px] text-zinc-400 mt-1">Immediate TCP RST on inject</p>
              </div>

              <div
                onClick={() => setIpsBruteJail(!ipsBruteJail)}
                className={`p-3 rounded-xl border cursor-pointer transition-colors ${
                  ipsBruteJail ? 'bg-[#12121c] border-emerald-600/60' : 'bg-[#0a0a10] border-zinc-800 text-zinc-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Fail2Ban Auto-Jail</span>
                  <span className={`text-[10px] ${ipsBruteJail ? 'text-emerald-400' : 'text-zinc-600'}`}>
                    {ipsBruteJail ? 'ON' : 'OFF'}
                  </span>
                </div>
                <p className="text-[10px] text-zinc-400 mt-1">15 auth fails = 24h ban</p>
              </div>

              <div
                onClick={() => setIpsSynCookie(!ipsSynCookie)}
                className={`p-3 rounded-xl border cursor-pointer transition-colors ${
                  ipsSynCookie ? 'bg-[#12121c] border-emerald-600/60' : 'bg-[#0a0a10] border-zinc-800 text-zinc-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">SYN Cookie Anti-DoS</span>
                  <span className={`text-[10px] ${ipsSynCookie ? 'text-emerald-400' : 'text-zinc-600'}`}>
                    {ipsSynCookie ? 'ON' : 'OFF'}
                  </span>
                </div>
                <p className="text-[10px] text-zinc-400 mt-1">Absorbs TCP SYN flood</p>
              </div>
            </div>

            {/* Manual Ban Form */}
            <form onSubmit={handleAddManualIpsRule} className="bg-[#12121c] border border-zinc-800 p-4 rounded-xl space-y-3 font-mono text-xs">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Ban className="w-3.5 h-3.5 text-red-500" />
                <span>Add Manual Firewall Block Rule</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={manualIpInput}
                  onChange={(e) => setManualIpInput(e.target.value)}
                  placeholder="Attacker IP (e.g. 198.51.100.99)"
                  className="bg-[#09090f] border border-zinc-700 rounded px-3 py-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  value={manualReasonInput}
                  onChange={(e) => setManualReasonInput(e.target.value)}
                  placeholder="Ban Reason"
                  className="bg-[#09090f] border border-zinc-700 rounded px-3 py-1.5 text-xs text-white"
                />
                <div className="flex gap-2">
                  <select
                    value={manualDurationInput}
                    onChange={(e: any) => setManualDurationInput(e.target.value)}
                    className="bg-[#09090f] border border-zinc-700 rounded px-2.5 py-1.5 text-xs text-white"
                  >
                    <option value="1 Hour">1 Hour</option>
                    <option value="24 Hours">24 Hours</option>
                    <option value="7 Days">7 Days</option>
                    <option value="Permanent">Permanent</option>
                  </select>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded text-xs transition-colors cursor-pointer shrink-0"
                  >
                    Enforce Ban
                  </button>
                </div>
              </div>
            </form>

            {/* Active Banned IP Registry */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Active Banned Attackers Registry ({ipsBannedList.length})</span>
                <span className="text-red-400 font-bold">Total Dropped Packets: 2,369</span>
              </div>

              <div className="bg-[#09090f] border border-zinc-800 rounded-xl overflow-hidden font-mono text-xs">
                <div className="grid grid-cols-12 bg-[#12121c] p-3 text-zinc-400 font-semibold border-b border-zinc-800 text-[11px]">
                  <div className="col-span-3">ATTACKER IP</div>
                  <div className="col-span-4">TRIGGER / REASON</div>
                  <div className="col-span-2">DURATION</div>
                  <div className="col-span-2 text-center">DROPPED PKTS</div>
                  <div className="col-span-1 text-right">ACTION</div>
                </div>

                <div className="divide-y divide-zinc-850">
                  {ipsBannedList.map((rule) => (
                    <div key={rule.id} className="grid grid-cols-12 p-3 items-center hover:bg-[#161622] transition-colors">
                      <div className="col-span-3 font-bold text-red-400 flex items-center gap-1.5">
                        <Ban className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span>{rule.ip}</span>
                      </div>
                      <div className="col-span-4 text-zinc-300 truncate">{rule.reason}</div>
                      <div className="col-span-2 text-zinc-400 text-[11px]">{rule.duration}</div>
                      <div className="col-span-2 text-center font-bold text-amber-400">{rule.droppedPackets}</div>
                      <div className="col-span-1 text-right">
                        <button
                          type="button"
                          onClick={() => handleUnblockIpsRule(rule.id)}
                          className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-emerald-400 rounded text-[10px] font-bold transition-colors cursor-pointer"
                        >
                          Unban
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 7: REPORTS                                             */}
      {/* ========================================================= */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="bg-[#0e0e14] border border-zinc-800/90 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-400 font-mono">
                  Technical Security Assessment Brief
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {generatedReport?.title || 'CARTIO Platform Hardening & Vulnerability Assessment'}
                </h3>
                <p className="text-xs text-zinc-400 font-mono mt-1">
                  Generated at {new Date(generatedReport?.generatedAt || Date.now()).toLocaleString()}
                </p>
              </div>

              <button
                onClick={handleDownloadReport}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg flex items-center gap-2 self-start sm:self-auto transition-colors cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Report (JSON/PDF)</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#12121c] border border-zinc-800 text-xs text-zinc-300 leading-relaxed font-mono">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-2">
                Executive Synthesis
              </h4>
              <p>
                Comprehensive automated security assessments executed across the CARTIO edge ecosystem. Multi-vector
                audits utilizing Custom Probes, Nmap network scanning, Metasploit verification modules, Burp Suite HTTP
                proxy inspection, Suricata IDS signature feeds, and inline IPS drop rules indicate a sound cryptographic
                and defensive posture. Zero active unmitigated Remote Code Execution vectors discovered.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                Itemized Tool Findings Summary
              </h4>
              <div className="divide-y divide-zinc-800">
                {vulnerabilities.map((v) => (
                  <div key={v.id} className="py-3 flex items-start justify-between gap-4 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold font-mono border ${getSeverityBadge(v.severity)}`}>
                          {v.severity}
                        </span>
                        <span className="font-bold text-white">{v.name}</span>
                      </div>
                      <p className="text-zinc-400 text-[11px] mt-1">{v.recommendation}</p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">{v.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
