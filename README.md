# CognitiveExercisesFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Docker 

Frontend does not start automatically with container as it has to be started after backend is set up. One needs to enter bash in the container by using "docker exec -it {container_name} bash" and run "service nginx start". Docker compose file is not to be run on its own. It should be copied into docker compose file that runs all the services. 

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
