Analyze and create a detailed plan (without executing anything yet) for setting up
a frontend project called "12-DeliveryApp" that includes:

Before planning anything, locate the project "11-cafeteria" in the current
workspace and use it as a reference for folder structure, gulpfile.js
configuration, and package.json dependencies. List what you found in it.

Creating the main project folder: 12-DeliveryApp

Creating this folder structure inside it:

src/
img/ (empty folder)
scss/
base/
_globales.scss
_index.scss
_mixins.scss
_normalize.scss
_utilidades.scss
_variables.scss
app.scss (inside scss/, not base/)
index.html (inside src/)
Running npm init -y inside 12-DeliveryApp to generate package.json.

Creating a gulpfile.js in the root with the same configuration found in
11-cafeteria, adapted for this project's folder structure.

Replicating the same npm dependencies found in 11-cafeteria/package.json
and installing them with npm install.

All scss partials (_*.scss) created as empty files.

index.html with a basic HTML5 boilerplate.

app.scss with @use imports for all partials inside base/.

For each step, tell me:

What exactly you will do
What files or folders will be created
What commands will be executed
Do not execute anything, just show me the plan.
