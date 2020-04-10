const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {

  const { url, title, techs } = request.body;

  const repository = { 
     id: uuid(),
     url, 
     title,
     techs,
     likes: 0
    }
  
    repositories.push(repository);

    response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;

  const repository = repositories.find(repository => repository.id === id);

  if (!repository) {
    response.status(400).send();
  }

  repository.url = url;
  repository.title = title;
  repository.techs = techs;

  response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex === -1) {
    response.status(400).send();
  }

  repositories.splice(repositoryIndex,1);

  response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id);

  if (!repository) {
    response.status(400).send();
  }
  
  repository.likes += 1;

  response.json(repository);
});

module.exports = app;
