// app/minha-trajetoria/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "Minha Trajetória",
  description:
    "Conheça a jornada de Nicollas Rezende no mundo da tecnologia e desenvolvimento - uma história de paixão, desafios e crescimento.",
};

export default function MinhaTrajetoriaPage() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <Section className="py-24 md:py-32 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Minha Jornada como Desenvolvedor
          </h1>
          <p className="text-lg md:text-xl text-text-secondary">
            Uma história de paixão, desafios e crescimento no mundo da
            tecnologia
          </p>
        </div>
      </Section>

      {/* Timeline Section */}
      <Section id="timeline">
        <SectionHeader
          title="Linha do Tempo"
          subtitle="Do primeiro contato com hardware até hoje"
        />

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Timeline Item 1 */}
          <GlassCard className="relative pl-8 md:pl-12 border-l-4 border-primary">
            <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-primary shadow-glow"></div>
            <div className="mb-4">
              <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                8 anos
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <i className="fas fa-microchip text-primary"></i>
              Primeiros Contatos com a Tecnologia
            </h3>
            <div className="space-y-4 text-text-secondary">
              <p>
                Minha história com o mundo da tecnologia começou cedo. Meu
                padrasto, que já trabalhava na área, foi quem me apresentou a
                esse universo fascinante. Ele me mostrou como um computador
                funcionava por dentro, despertando minha curiosidade.
              </p>
              <p>
                Enquanto outras crianças brincavam com carrinhos, eu usava um{" "}
                <span className="text-primary font-semibold">
                  HD como brinquedo
                </span>
                . Desde cedo, já dava para perceber que eu não era uma criança
                muito comum.
              </p>
              <p>
                Esses primeiros contatos com hardware despertaram uma
                curiosidade que me acompanha até hoje. Passava horas
                desmontando periféricos antigos, tentando entender como cada
                peça se conectava e funcionava em conjunto.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Hardware
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Curiosidade
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Fundamentos
                </span>
              </div>
            </div>
          </GlassCard>

          {/* Timeline Item 2 */}
          <GlassCard className="relative pl-8 md:pl-12 border-l-4 border-primary">
            <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-primary shadow-glow"></div>
            <div className="mb-4">
              <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Ensino Fundamental
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <i className="fas fa-gamepad text-primary"></i>
              A Descoberta das Lan Houses
            </h3>
            <div className="space-y-4 text-text-secondary">
              <p>
                Foi no ensino fundamental que tudo começou a fazer mais sentido.
                Descobri as lan houses e, mesmo minha cidade tendo apenas uma (e
                não das melhores), aqueles momentos foram mágicos.
              </p>
              <p>
                Guardava o dinheiro do lanche só para passar o final de semana
                jogando horas a fio. Não eram só os jogos que me fascinavam, mas
                a magia por trás deles: por que o personagem se mexe daquele
                jeito? Como ele interage com o mundo ao redor?
              </p>
              <p>
                Essas perguntas me levaram a descobrir o{" "}
                <span className="text-primary font-semibold">
                  mundo da programação
                </span>{" "}
                e como era possível criar universos inteiros com código.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Jogos
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Lógica
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Criatividade
                </span>
              </div>
            </div>
          </GlassCard>

          {/* Timeline Item 3 */}
          <GlassCard className="relative pl-8 md:pl-12 border-l-4 border-primary">
            <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-primary shadow-glow"></div>
            <div className="mb-4">
              <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Ensino Médio
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <i className="fas fa-laptop-code text-primary"></i>
              Primeiro Computador e Hello World
            </h3>
            <div className="space-y-4 text-text-secondary">
              <p>
                No ensino médio, ganhei meu primeiro computador. Foi como se
                tivesse recebido as chaves de um novo mundo. Nesse período,
                conheci{" "}
                <span className="text-primary font-semibold">Lua Script</span>,
                uma linguagem orientada a objetos que descobri em fóruns que
                frequentava.
              </p>
              <p>
                Em poucos dias, criei meu primeiro <em>Hello World</em> e me
                senti o maior programador do planeta. Logo depois, desenvolvi
                meu primeiro jogo: um RPG com física bugada, sprites horríveis e
                movimentação que parecia bêbada, mas para mim era a coisa mais
                incrível do mundo.
              </p>
              <div className="bg-background-secondary/50 p-4 rounded-lg mt-4 overflow-x-auto">
                <pre className="text-sm text-text-secondary">
                  <code>{`-- Meu primeiro código em Lua
function love.draw()
    love.graphics.setColor(1, 1, 1)
    love.graphics.print("Hello World!", 400, 300)
end

function love.update(dt)
    -- Lógica do jogo aqui
    if love.keyboard.isDown("right") then
        player.x = player.x + player.speed * dt
    end
end`}</code>
                </pre>
              </div>
              <p className="text-sm italic">
                Embora simples, este código me ensinou conceitos fundamentais de
                programação como funções, condicionais e lógica de eventos. Foi
                o início de uma paixão que só cresceria com o tempo.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Lua Script
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Game Dev
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Hello World
                </span>
              </div>
            </div>
          </GlassCard>

          {/* Timeline Item 4 */}
          <GlassCard className="relative pl-8 md:pl-12 border-l-4 border-primary">
            <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-primary shadow-glow"></div>
            <div className="mb-4">
              <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                17 anos
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <i className="fab fa-python text-primary"></i>
              A Paixão pelo Python
            </h3>
            <div className="space-y-4 text-text-secondary">
              <p>
                Com 17 anos, no meu último ano do ensino médio, conheci o amor
                da minha vida:{" "}
                <span className="text-primary font-semibold">Python</span>. Me
                apaixonei por ser uma linguagem poderosa e, ao mesmo tempo,
                simples de usar.
              </p>
              <p>
                Passei aquele ano todo focado nela, chegando até a matar aula
                para estudar (não faz sentido, mas a paixão era verdadeira).
                Criei meus primeiros projetos solo, ainda sem frameworks, só
                Python puro.
              </p>
              <p>
                No fim do ensino médio, achei que era um gênio da programação,
                pronto para conquistar o mundo. Mal sabia eu que o mundo real
                tinha outros planos para mim.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Python
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Desenvolvimento
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Autodidatismo
                </span>
              </div>
            </div>
          </GlassCard>

          {/* Timeline Item 5 */}
          <GlassCard className="relative pl-8 md:pl-12 border-l-4 border-primary">
            <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-primary shadow-glow"></div>
            <div className="mb-4">
              <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                17-18 anos
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <i className="fas fa-robot text-primary"></i>
              Primeira Grande Experiência
            </h3>
            <div className="space-y-4 text-text-secondary">
              <p>
                Aos 17 para 18 anos, tive minha primeira oportunidade real:
                desenvolver um sistema de automação de vendas com a{" "}
                <span className="text-primary font-semibold">
                  API do WhatsApp da Meta
                </span>
                . Aceitei o desafio cheio de confiança, sem imaginar o que
                estava por vir.
              </p>
              <p>
                A realidade bateu forte: documentação terrível, meu inglês pior
                ainda, e nenhuma experiência prática. Passei noites em claro
                estudando{" "}
                <span className="text-primary font-semibold">webhooks</span>,{" "}
                <span className="text-primary font-semibold">Flask</span>, e
                como enviar e receber mensagens automatizadas.
              </p>
              <p>
                Meu código era um verdadeiro Frankenstein, com partes
                improvisadas e adaptações de tutoriais. Mas, apesar do caos,
                consegui finalizar o sistema. O bot entrou em produção e
                funcionava!
              </p>
              <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg mt-4">
                <p className="text-sm">
                  <strong className="text-primary">Lição aprendida:</strong> No
                  mundo real, as soluções raramente são perfeitas ou elegantes,
                  especialmente no início. O importante é persistir, ser
                  resiliente e entregar resultados, mesmo que o processo seja
                  caótico.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  API
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Flask
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Webhooks
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Automação
                </span>
              </div>
            </div>
          </GlassCard>
        </div>
      </Section>

      {/* Current Position Section */}
      <Section id="current-position" className="bg-gradient-to-b from-transparent to-primary/5">
        <SectionHeader
          title="Posição Atual"
          subtitle="Onde estou hoje na minha jornada"
        />

        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold">
                SEA
              </div>
              <div>
                <h3 className="text-2xl font-bold">
                  Desenvolvedor na SEA Tecnologia
                </h3>
                <p className="text-text-secondary">2023 - Presente</p>
              </div>
            </div>

            <div className="space-y-4 text-text-secondary">
              <p>
                Atualmente, trabalho como Desenvolvedor na{" "}
                <span className="text-primary font-semibold">
                  SEA Tecnologia
                </span>
                , onde aplico meus conhecimentos em Python para criar soluções
                de automação robustas e eficientes, além de contribuir com a
                criação e migração de portais governamentais.
              </p>

              <p className="font-semibold text-text-primary mt-6">
                Esta posição me permitiu expandir minhas habilidades em diversas
                áreas críticas:
              </p>

              <ul className="space-y-3 ml-4">
                <li className="flex gap-3">
                  <i className="fas fa-check-circle text-primary mt-1"></i>
                  <div>
                    <strong className="text-primary">
                      Automação de Processos:
                    </strong>{" "}
                    Desenvolvimento de sistemas automatizados utilizando Python
                    para otimizar fluxos de trabalho e aumentar a eficiência
                    operacional.
                  </div>
                </li>
                <li className="flex gap-3">
                  <i className="fas fa-check-circle text-primary mt-1"></i>
                  <div>
                    <strong className="text-primary">
                      Portais Governamentais:
                    </strong>{" "}
                    Criação e migração de portais do governo para novos sistemas
                    de gerenciamento de conteúdo (CMS), garantindo melhor
                    usabilidade e manutenção.
                  </div>
                </li>
                <li className="flex gap-3">
                  <i className="fas fa-check-circle text-primary mt-1"></i>
                  <div>
                    <strong className="text-primary">
                      Integração de Sistemas:
                    </strong>{" "}
                    Desenvolvimento de interfaces e conectores para permitir a
                    comunicação entre diversos sistemas governamentais.
                  </div>
                </li>
                <li className="flex gap-3">
                  <i className="fas fa-check-circle text-primary mt-1"></i>
                  <div>
                    <strong className="text-primary">Análise de Dados:</strong>{" "}
                    Extração, processamento e análise de conjuntos de dados para
                    apoiar tomadas de decisão e melhorias de processos.
                  </div>
                </li>
              </ul>

              <div className="mt-8">
                <h4 className="font-semibold text-text-primary mb-4">
                  Principais Tecnologias
                </h4>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-gradient-primary text-white rounded-full text-sm font-medium flex items-center gap-2">
                    <i className="fab fa-python"></i>
                    Python
                  </span>
                  <span className="px-4 py-2 bg-gradient-primary text-white rounded-full text-sm font-medium flex items-center gap-2">
                    <i className="fas fa-cogs"></i>
                    Automação
                  </span>
                  <span className="px-4 py-2 bg-gradient-primary text-white rounded-full text-sm font-medium flex items-center gap-2">
                    <i className="fas fa-database"></i>
                    SQL
                  </span>
                  <span className="px-4 py-2 bg-gradient-primary text-white rounded-full text-sm font-medium flex items-center gap-2">
                    <i className="fab fa-js"></i>
                    JavaScript
                  </span>
                  <span className="px-4 py-2 bg-gradient-primary text-white rounded-full text-sm font-medium flex items-center gap-2">
                    <i className="fas fa-file-code"></i>
                    CMS
                  </span>
                  <span className="px-4 py-2 bg-gradient-primary text-white rounded-full text-sm font-medium flex items-center gap-2">
                    <i className="fas fa-chart-line"></i>
                    Análise de Dados
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </Section>

      {/* Quote Section */}
      <Section id="quote" className="py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="h-px bg-gradient-primary mb-8"></div>
          <blockquote className="text-2xl md:text-3xl font-semibold italic text-text-secondary">
            "Nada é impossível, e, se for, você sempre pode dar um jeito de
            tornar possível."
          </blockquote>
          <div className="h-px bg-gradient-primary mt-8"></div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="pb-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold mb-8">
            Vamos construir algo incrível juntos?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <i className="fas fa-arrow-left"></i>
              Voltar ao Portfólio
            </Link>
            <Link
              href="/#contact"
              className="px-6 py-3 bg-gradient-primary text-white rounded-full hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2"
            >
              Vamos Conversar
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
