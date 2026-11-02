# Fork pessoal (Angelo90810)

Fork de [itechmeat/open-second-brain](https://github.com/itechmeat/open-second-brain) ajustado para uso no Hermes do Windows. `upstream` = itechmeat; as mudanças ficam na `main` deste fork.

## Mudanças em relação ao upstream

1. **Recall por mensagem traz a regra, não a trilha de evidência.** `brain_context_pack` removia nada do corpo das preferências escritas pelo `dream`, que só contém `## Origin` / `## Recent applications` / `## Recent violations` (listas de wikilinks). Agora essas seções saem e, se nada mais sobrar, o item injeta o `principle` da preferência (`renderBeliefBody` em `src/core/brain/context-pack.ts`). Páginas sem trilha de evidência ficam idênticas.
2. **Recall por mensagem sem duplicar o `active.md`.** O provider do Hermes descarta itens cujo `pref-*` já está em `Brain/active.md` (que a sessão já recebe) e itens `ret-*` (aposentados).
3. **Recall por mensagem configurável** (variáveis no `.env` do perfil Hermes):

   | Variável | Padrão | Efeito |
   |---|---|---|
   | `OPEN_SECOND_BRAIN_PREFETCH` | `true` | `false`/`0`/`off` desliga o recall por mensagem (o lembrete de identidade continua) |
   | `OPEN_SECOND_BRAIN_PREFETCH_MAX_TOKENS` | `1024` | orçamento de tokens do recall por mensagem |
   | `OPEN_SECOND_BRAIN_PREFETCH_SKIP_ACTIVE` | `true` | descarta preferências já presentes em `Brain/active.md` |
   | `OPEN_SECOND_BRAIN_PREFETCH_SKIP_RETIRED` | `true` | descarta crenças aposentadas (`ret-*`) |

4. **Sem WARNING `register_health_check` no Hermes.** O coletor de provedores de memória do Hermes responde a qualquer `register_*` via `__getattr__`; o plugin agora só chama um método de health check que a classe do contexto realmente define.

## Atualizar a partir do upstream

```bash
git fetch upstream
git merge upstream/main      # resolver conflitos mantendo as mudanças acima
bun test tests/core/brain/context-pack*
python -m unittest discover -s tests/python -t .
git push origin main
```
