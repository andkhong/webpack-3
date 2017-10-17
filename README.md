TODO
1. Do Defer in tags
2. Deterministic Hashes for Caching 
3. Properally Tree shake / Cherry pick
    Authoring Libraries
4. Enable style object with react

How To:
1. npm run dev 
2. npm run build

## Methodology
1. Webpack Common shares common code that is merged with either dev/prod config when cli is run.
2. Index.html is the fallback page for webpack devServer so that is will be used in memory, less loaders, and have devServer build/compile quicker. Any extra changes for dev environment should be hard coded into index.html for improved developer experience.
3. 