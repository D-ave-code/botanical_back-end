import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class ModeloService {
  private readonly openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_APIKEY,
    });
  }
  async questionGPT(prompt: string) {
    console.log(prompt);
    const datos = `tomando en cuenta estos datos: ["1": "Arrayán",
    "2": "Arupo", 
    "3": "Magnolia", 
    "4": "Pino", 
    "5": "Molle", 
    "6": "Geranio", 
    "7": "Palma",
    "8": "Margaritas", 
    "9": "Tomate de árbol", 
    "10": "Granadilla",
    "11": "Guayaba", 
    "12": "Anís", 
    "13": "Hierbaluisa",
    "14": "Romero"]`;
    const inf = `toma en cuenta las preguntas y respuestas de acontinuacion:`;
   
    const finPro = `me gustaría recibir una recomendación basada en mis 
    preferencias tomando en cuenta cada una de las preguntas y también el porque de la sugerencia.
    la sugerencia no debe sobrepasar las 50 palabras, tambien siempre devuelve el id de la planta  (id) al final de tu respuesta  
    devuelve solamente un json con la estructura {"recommendation": "...la recomendacion", "plantId": "...el id de la planta que recomiendas", "caracteristicas": ["las caracteristicas"]} no comentarios extra`;
    const propmptFinal = datos + inf + prompt + finPro;
    const chatCompletion = await this.openai.chat.completions.create({
      messages: [{ role: 'user', content: propmptFinal }],
      model: 'gpt-3.5-turbo-0125',
    });

    return chatCompletion.choices[0].message.content;
  }
}
