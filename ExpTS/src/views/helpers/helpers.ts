import { Technology } from './helpersTypes'; 

export function listNodejsTechnologies(technologies: Technology[]): string {
  const nodejsTechs = technologies.filter(tech => tech.poweredByNodejs);

  const listItems = nodejsTechs.map(tech => `<li>${tech.name} - ${tech.type}</li>`);

  if (listItems.length === 0) {
    return '<p>Nenhuma tecnologia baseada em Node.js encontrada.</p>';
  }

  return `<ul>${listItems.join('')}</ul>`;
}

// Se você tiver outros helpers no futuro, pode exportá-los aqui também:
// export function outroHelper(data: any): string { ... }