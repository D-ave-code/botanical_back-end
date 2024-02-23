import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ModeloService } from './modelo.service';
@ApiTags('modeloOpenai')
@Controller('modelo')
export class ModeloController {
    constructor(private modeloService: ModeloService) {}
    @Post()
    getQuestion(@Body('prompt') prompt:string){
       
        return  this.modeloService.questionGPT(prompt)
    }


 
}
