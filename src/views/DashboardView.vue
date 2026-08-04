<template>
  <section>
    <p class="intro">Zaplanuj dobry dzień i wróć do najważniejszych rzeczy.</p>
    <div class="dashboard-grid">
      <article class="focus-card">
        <p>AKTUALNA SESJA</p>
        <h2>Gotowy na pierwszą sesję?</h2>
        <span>Timer Pomodoro będzie dostępny w kolejnym kroku.</span>
      </article>
      <article class="summary-card">
        <strong>0</strong><span>Zadań na dziś</span>
      </article>
      <article class="summary-card">
        <strong>0 min</strong><span>Nauki w tym tygodniu</span>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "../styles/variables" as *;

.intro {
  margin: -18px 0 26px;
  color: $color-text-muted;
}
.dashboard-grid {
  display: grid;
  grid-template-columns: 1.7fr 1fr 1fr;
  gap: 18px;
}
.focus-card,
.summary-card {
  min-height: 180px;
  padding: 24px;
  border-radius: $radius-lg;
}
.focus-card {
  color: #fff;
  background: linear-gradient(135deg, $color-primary, #9375f5);
}
.focus-card p {
  margin: 0 0 22px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}
.focus-card h2 {
  max-width: 300px;
  margin: 0 0 9px;
  font-size: 1.45rem;
  letter-spacing: -0.04em;
}
.focus-card span {
  color: #e9e5ff;
  font-size: 0.875rem;
}
.summary-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: $color-surface;
  border: 1px solid $color-border;
  box-shadow: $shadow-sm;
}
.summary-card strong {
  font-size: 1.7rem;
  letter-spacing: -0.04em;
}
.summary-card span {
  color: $color-text-muted;
  font-size: 0.875rem;
}
@media (max-width: 980px) {
  .dashboard-grid {
    grid-template-columns: 1fr 1fr;
  }
  .focus-card {
    grid-column: span 2;
  }
}
@media (max-width: 560px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  .focus-card {
    grid-column: auto;
  }
}
</style>
