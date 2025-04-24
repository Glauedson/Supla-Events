import React, { useState } from 'react';
import styles from './terms.module.css';

const TermsPage = () => {

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>termos de uso e condições</h1>
        <p className={styles.subtitle}>O portal de eventos mais punk da internet</p>
      </header>

      <div className={styles.content}>
        <div className={styles.intro}>
          <p>Bem-vindo ao Supla, o portal de eventos mais punk da internet. Ao usar nosso site, você concorda com os termos abaixo. Se não concordar... paciência, vai ter que concordar do mesmo jeito.</p>
        </div>

        <div className={styles.termsSection}>
          <h2>1. Aceitação dos Termos</h2>
          <p>Ao clicar em qualquer botão, rolar a página ou simplesmente abrir o site por acidente, você automaticamente aceita todos os termos. Até os que você nem leu. Principalmente esses.</p>
        </div>

        <div className={styles.termsSection}>
          <h2>2. Sobre o Supla</h2>
          <p>O Supla é uma plataforma alternativa, underground e um pouco maluca para gestão de eventos. A gente não garante sucesso no seu evento, mas garante estilo, caos e um leve senso de perigo.</p>
        </div>

        <div className={styles.termsSection}>
          <h2>3. Responsabilidades do Usuário</h2>
          <ul>
            <li>Não criar eventos com nomes como "Churrasco da Firma" se não tiver carne.</li>
            <li>Não vender ingresso de R$ 200 pra evento online com áudio estourado.</li>
            <li>Não confundir a gente com o Sympla. Eles são certinhos demais. Nós não usamos gravata.</li>
          </ul>
        </div>

        <div className={styles.termsSection}>
          <h2>4. Política de Reembolso</h2>
          <p>Se você comprou e se arrependeu, sinta-se abraçado. Mas não devolvemos nada. Nosso sistema de reembolso é baseado em sorteio mensal, interpretação de sonhos e consulta ao tarô do Supla.</p>
        </div>

        <div className={styles.termsSection}>
          <h2>5. Dados Pessoais</h2>
          <p>Coletamos seus dados com carinho e responsabilidade duvidosa. Afinal, eles serão usados para:</p>
          <ul>
            <li>Criar cartões falsos com nomes criativos como "Clóvis da Lan House"</li>
            <li>Emitir cheques sem fundos com valores que causam vergonha alheia</li>
            <li>Preencher formulários de programas de pontos que ninguém usa</li>
          </ul>
          <p>Fique tranquilo, tudo é feito de forma 100% ilegalmente fictícia e por puro entretenimento.</p>
        </div>

        <div className={styles.termsSection}>
          <h2>6. Eventos com o Supla</h2>
          <p>Você pode criar, divulgar e vender ingressos pros seus eventos. Mas se for um show do próprio Supla e ele aparecer de verdade, a gente também quer ingresso VIP.</p>
        </div>

        <div className={styles.termsSection}>
          <h2>7. Suporte Técnico</h2>
          <p>Nosso suporte está disponível de segunda a sexta, das 14h às 14h15, exceto em feriados, fins de semana, lua cheia e dias em que o estagiário dormiu demais.</p>
        </div>

        <div className={styles.termsSection}>
          <h2>8. Alterações nos Termos</h2>
          <p>Podemos mudar esses termos a qualquer momento. Inclusive agora. E você acabou de aceitar a versão nova só por estar lendo.</p>
        </div>

        <div className={styles.termsSection}>
          <h2>9. Contato</h2>
          <p>Pra falar com a gente, grite "PAPITO" bem alto. Se a gente não responder, tente outra dimensão.</p>
        </div>
      </div>

      <footer className={styles.footer}>
        <p>© 2025 Supla - O site que não tem nada a ver com o cantor, mas adoraríamos conhecê-lo!</p>
      </footer>
    </div>
  );
};

export default TermsPage;