import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Server, 
  BookText, // Este ícone estava importado mas não usado, vou manter
  Menu, 
  X, 
  Twitter, 
  Github, 
  MessageSquare,
  ArrowRight,
  Lock,
  Terminal, // Novo ícone para a seção de comandos
  LifeBuoy // Novo ícone para a seção de suporte
} from 'lucide-react';

/* Componente principal da Aplicação.
  Isso renderiza todas as seções da página.
*/
export default function App() {
  return (
    <>
      {/* Injetamos os estilos globais e animações aqui.
        Isso nos permite criar o fundo de partículas/estrelas animado
        e as animações de entrada (fade-in) sem arquivos CSS externos.
      */}
      <style>{`
        /* Importa a fonte Inter do Google Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        /* NOVO: Adiciona o scroll suave (arrastado) */
        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Inter', sans-serif;
          /* Cor de fundo base escura */
          background-color: #020617; /* slate-950 */
          color: #e2e8f0; /* slate-200 */
        }

        .hero-section {
          /* Esta é a mágica do fundo:
            1. Um gradiente linear neon (roxo para azul escuro)
            2. Múltiplas camadas de gradientes radiais para simular estrelas/partículas
          */
          background-image:
            /* Partículas/Estrelas (camadas 1 e 2) */
            radial-gradient(rgba(0, 242, 255, 0.3), rgba(0, 242, 255, 0) 2px, transparent 40px),
            radial-gradient(rgba(142, 45, 226, 0.3), rgba(142, 45, 226, 0) 1px, transparent 30px),
            /* Gradiente de fundo principal */
            linear-gradient(300deg, #020617, #0c0a1d 30%, #4a044e 100%);
          
          background-size: 550px 550px, 350px 350px, 100% 100%;
          background-position: 0 0, 40px 60px, 0 0;
          
          /* Animação que move as "estrelas" */
          animation: moveStars 120s linear infinite;
        }

        @keyframes moveStars {
          from { background-position: 0 0, 40px 60px, 0 0; }
          to { background-position: -10000px 5000px, -10000px 5000px, 0 0; }
        }

        /* Animação de entrada (fade in + slide up) */
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        /* Classes de atraso para escalonar animações */
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Efeito de brilho (glow) para textos e logo */
        .text-glow-blue {
          text-shadow: 0 0 8px rgba(0, 242, 255, 0.6);
        }
        .text-glow-purple {
           text-shadow: 0 0 8px rgba(192, 132, 252, 0.6);
        }
        
        /* Efeito de brilho em borda para os cards */
        .card-glow-border {
          border-color: rgba(59, 130, 246, 0.1); /* blue-500 com 10% opacidade */
          transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }
        .card-glow-border:hover {
          border-color: rgba(59, 130, 246, 0.4); /* Aumenta opacidade no hover */
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.1); /* Adiciona sombra/brilho */
        }
      `}</style>
      
      {/* Container principal da aplicação */}
      <div className="min-h-screen bg-slate-950">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <CommandsSection /> {/* NOVA SEÇÃO */}
          <SupportSection />  {/* NOVA SEÇÃO */}
        </main>
        <Footer />
      </div>
    </>
  );
}

// --- Componentes da Página ---

/**
 * Barra de Navegação Fixa
 * Inclui o logo, links de navegação, botão de CTA e menu mobile.
 */
function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Links atualizados para apontar para as novas seções
  const navLinks = [
    { name: 'Início', href: '#' },
    { name: 'Comandos', href: '#commands' }, // ATUALIZADO
    { name: 'Painel', href: '#' },
    { name: 'Suporte', href: '#support' }, // ATUALIZADO
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="backdrop-blur-lg bg-slate-950/70 border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <a href="#" className="flex-shrink-0 flex items-center gap-2">
              <Lock className="w-7 h-7 text-blue-400 text-glow-blue" />
              <span className="text-2xl font-black text-white text-glow-blue">
                Privacy
              </span>
            </a>
            
            {/* Links Desktop */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            {/* Botão Desktop */}
            <div className="hidden md:flex items-center">
              <a
                href="#"
                className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition-all duration-200"
              >
                Adicionar ao Discord
              </a>
            </div>
            
            {/* Botão Menu Mobile */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Abrir menu principal</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Painel Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-blue-900/30" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)} // Fecha o menu ao clicar
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <a
                href="#"
                className="block w-11/12 mx-auto text-center px-4 py-2 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition-all duration-200"
              >
                Adicionar ao Discord
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

/**
 * Seção Hero (Boas-vindas)
 * Com o fundo animado, título principal, CTA e um mockup do Discord.
 */
function HeroSection() {
  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Overlay de gradiente escuro (opcional, para mais contraste) */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Título */}
        <h1 className="text-5xl md:text-7xl font-black text-white fade-in-up text-glow-blue">
          Proteja seus servidores
        </h1>
        <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 fade-in-up delay-100">
          com o poder da privacidade.
        </h1>
        
        {/* Descrição */}
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300 fade-in-up delay-200">
          Privacy é a solução completa de moderação e segurança projetada para 
          manter sua comunidade segura e protegida, 24 horas por dia.
        </p>
        
        {/* Botões CTA */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 fade-in-up delay-300">
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-bold rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transform-gpu transition-all duration-300 hover:scale-105 shadow-2xl shadow-blue-500/20"
          >
            Adicionar ao Discord
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center justify-center px-8 py-3 border border-gray-700 text-base font-medium rounded-lg text-white bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/70 transform-gpu transition-all duration-300 hover:scale-105"
          >
            Explorar Recursos
          </a>
        </div>

        {/* Mockup do Discord */}
        <div className="mt-16 fade-in-up delay-400">
          <div className="max-w-3xl mx-auto bg-gray-900/70 backdrop-blur-md rounded-xl shadow-2xl shadow-black/30 border border-blue-900/30 overflow-hidden">
            <div className="flex items-center justify-between p-3 bg-gray-950/50 border-b border-blue-900/30">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
              <div className="text-sm text-gray-400">#geral</div>
              <div className="w-12"></div>
            </div>
            <div className="p-4 md:p-6 space-y-4 text-left">
              {/* Mensagem 1 (Usuário) */}
              <div className="flex items-start space-x-3">
                <img className="w-10 h-10 rounded-full" src="https://placehold.co/64x64/7b34dd/ffffff?text=U" alt="[Avatar do Usuário]" />
                <div>
                  <span className="text-base font-medium text-white">Usuário</span>
                  <span className="ml-2 text-xs text-gray-400">Hoje às 15:10</span>
                  <p className="text-gray-300">Ei, alguém pode me passar um link suspeito?</p>
                </div>
              </div>
              {/* Mensagem 2 (Bot Privacy) */}
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-base font-medium text-blue-400">Privacy</span>
                  <span className="ml-1 text-xs font-medium text-white bg-blue-600 px-1.5 py-0.5 rounded">BOT</span>
                  <span className="ml-2 text-xs text-gray-400">Hoje às 15:10</span>
                  <p className="text-red-400 bg-red-900/30 border border-red-500/50 rounded-lg p-3 mt-1">
                    <span className="font-bold">[ALERTA DE SEGURANÇA]</span> A mensagem do <span className="font-medium text-white">@Usuário</span> foi bloqueada por conter um link malicioso (Phishing).
                    <br/>
                    <span className="text-gray-300 text-sm">Ação: Usuário silenciado por 10 minutos.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Seção de Recursos (Features)
 * Exibe os principais recursos do bot em um grid de cards.
 */
function FeaturesSection() {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Moderação Avançada',
      description: 'Sistema de auto-moderação com filtros de spam, links, convites e palavras-chave customizáveis.',
    },
    {
      icon: Server,
      title: 'Logs Completos',
      description: 'Registre todas as ações no servidor. Saiba quem baniu, quem deletou mensagens e quem entrou ou saiu.',
    },
    {
      icon: Lock,
      title: 'Proteção Anti-Raid',
      description: 'Bloqueie automaticamente ataques de bots e contas falsas, mantendo seu servidor seguro contra invasões.',
    },
  ];

  return (
    <section id="features" className="py-24 sm:py-32 bg-slate-950 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título da Seção */}
        <div className="text-center">
          <h2 className="text-base font-semibold text-blue-400 tracking-wide uppercase">Recursos</h2>
          <p className="mt-2 text-4xl font-black text-white sm:text-5xl text-glow-purple">
            Tudo que você precisa
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
            Um conjunto de ferramentas robustas para garantir a ordem e a segurança.
          </p>
        </div>
        
        {/* Grid de Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`fade-in-up delay-${(index + 1) * 100} bg-slate-900 p-6 rounded-2xl shadow-2xl shadow-black/20 card-glow-border transform-gpu transition-all duration-300 hover:-translate-y-2`}
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-bold text-white">{feature.title}</h3 >
                <p className="mt-2 text-base text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

/**
 * NOVA SEÇÃO: Comandos
 * Exibe uma lista de comandos de exemplo.
 */
function CommandsSection() {
  // 7 comandos de exemplo como solicitado
  const commands = [
    { name: '/lock', description: 'Tranca o canal atual, impedindo mensagens.' },
    { name: '/unlock', description: 'Destranca o canal atual, permitindo mensagens.' },
    { name: '/ban', description: 'Bane um usuário permanentemente do servidor.' },
    { name: '/kick', description: 'Expulsa um usuário do servidor.' },
    { name: '/mute', description: 'Silencia um usuário por um tempo determinado.' },
    { name: '/logs', description: 'Mostra os logs de moderação recentes.' },
    { name: '/clear', description: 'Limpa um número específico de mensagens do chat.' },
  ];

  return (
    <section id="commands" className="py-24 sm:py-32 bg-slate-900 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título da Seção */}
        <div className="text-center">
          <h2 className="text-base font-semibold text-blue-400 tracking-wide uppercase">Comandos</h2>
          <p className="mt-2 text-4xl font-black text-white sm:text-5xl text-glow-purple">
            Controle Total
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
            Comandos intuitivos para gerenciamento fácil e rápido.
          </p>
        </div>
        
        {/* Grid de Comandos */}
        <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {commands.map((command, index) => (
            <div
              key={command.name}
              className={`fade-in-up delay-${(index + 1) * 100} bg-slate-800 p-5 rounded-lg shadow-lg flex items-center space-x-4 border border-slate-700 hover:border-blue-500 transition-colors duration-200`}
            >
              <div className="flex-shrink-0">
                <Terminal className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{command.name}</h3>
                <p className="text-base text-gray-400">{command.description}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center mt-12 text-gray-400 fade-in-up delay-500">
          ...e muito mais! Veja a lista completa no painel.
        </p>
        
      </div>
    </section>
  );
}

/**
 * NOVA SEÇÃO: Suporte (CTA)
 * Um call-to-action para o servidor de suporte.
 */
function SupportSection() {
  return (
    <section id="support" className="py-24 sm:py-32 bg-slate-950 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 md:p-16 text-center card-glow-border fade-in-up">
          <div className="flex justify-center mb-6">
             <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <LifeBuoy className="h-9 w-9" aria-hidden="true" />
              </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Precisa de ajuda ou tem alguma dúvida?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
            A forma mais rápida de obter suporte é entrando em nossa 
            comunidade oficial no Discord. Nossa equipe está lá para ajudar!
          </p>
          <div className="mt-10 flex justify-center">
            <a
              href="#" // Link para o servidor do Discord
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-bold rounded-lg text-slate-900 bg-white hover:bg-gray-200 transform-gpu transition-all duration-300 hover:scale-105 shadow-2xl shadow-white/10"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Entrar no Servidor de Suporte
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


/**
 * Rodapé
 * Contém links de navegação, sociais e copyright.
 */
function Footer() {
  const footerLinks = {
    Produto: [
      { name: 'Comandos', href: '#commands' }, // ATUALIZADO
      { name: 'Painel', href: '#' },
      { name: 'Status', href: '#' },
    ],
    Comunidade: [
      { name: 'Servidor de Suporte', href: '#support' }, // ATUALIZADO
      { name: 'Github', href: '#' },
      { name: 'Twitter', href: '#' },
    ],
    Legal: [
      { name: 'Política de Privacidade', href: '#' },
      { name: 'Termos de Serviço', href: '#' },
    ],
  };
  
  const socialIcons = [
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'GitHub', href: '#', icon: Github },
    { name: 'Discord', href: '#', icon: MessageSquare },
  ];

  return (
    <footer className="bg-slate-950 border-t border-blue-900/30" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Rodapé
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* Coluna 1: Logo e Social */}
          <div className="space-y-8 xl:col-span-1">
            <a href="#" className="flex-shrink-0 flex items-center gap-2">
              <Lock className="w-7 h-7 text-blue-400 text-glow-blue" />
              <span className="text-2xl font-black text-white text-glow-blue">
                Privacy
              </span>
            </a>
            <p className="text-gray-400 text-base max-w-xs">
              Segurança e moderação de ponta para sua comunidade no Discord.
            </p>
            <div className="flex space-x-6">
              {socialIcons.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-400 hover:text-white transition-colors duration-200">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Colunas 2 e 3: Links */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Produto</h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.Produto.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-gray-400 hover:text-white transition-colors duration-200">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Comunidade</h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.Comunidade.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-gray-400 hover:text-white transition-colors duration-200">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.Legal.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-gray-400 hover:text-white transition-colors duration-200">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-base text-gray-500 xl:text-center">
            &copy; {new Date().getFullYear()} Privacy Bot. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}


