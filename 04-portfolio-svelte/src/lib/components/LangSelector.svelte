<script>
  import { lang } from '$lib/stores/lang.js';
  import { languages } from '$lib/i18n/translations.js';

  let open = false;

  function select(code) {
    $lang = code;
    open = false;
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') open = false;
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="lang-selector" on:click|stopPropagation>
  <button
    class="lang-toggle"
    on:click={() => open = !open}
    aria-haspopup="listbox"
    aria-expanded={open}
    aria-label="Select language"
  >
    <span>{languages[$lang].flag}</span>
    <span>{$lang.toUpperCase()}</span>
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M1 3l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  </button>

  {#if open}
    <ul class="lang-menu" role="listbox">
      {#each Object.entries(languages) as [code, info]}
        <li role="option" aria-selected={$lang === code}>
          <button
            class="lang-option"
            class:active={$lang === code}
            on:click={() => select(code)}
          >
            {info.flag} {info.label}
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<!-- Cierra al hacer clic fuera -->
<svelte:body on:click={() => { if (open) open = false; }} />

<style>
  .lang-selector { position: relative; }

  .lang-toggle {
    display: flex;
    align-items: center;
    gap: 5px;
    background: transparent;
    border: 1px solid var(--color-border);
    color: var(--color-muted);
    padding: 5px 10px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: border-color var(--transition), color var(--transition);
  }

  .lang-toggle:hover {
    border-color: var(--color-accent);
    color: var(--color-text);
  }

  .lang-menu {
    position: absolute;
    top: calc(100% + 6px);
    right: 0;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    list-style: none;
    padding: 4px;
    min-width: 140px;
    z-index: 200;
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  }

  .lang-option {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    background: none;
    border: none;
    color: var(--color-muted);
    padding: 7px 10px;
    border-radius: 5px;
    font-size: 13px;
    font-family: inherit;
    cursor: pointer;
    text-align: left;
    transition: background 150ms, color 150ms;
  }

  .lang-option:hover,
  .lang-option.active {
    background: rgba(249, 115, 22, 0.1);
    color: var(--color-accent);
    font-weight: 600;
  }
</style>
