import { Controller, Get, Header, Param, Render, Res, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller()
export class AppController {
  @Get('/:id')
  @Render('index')
  redirect(@Param() param) {
    return { message: param.id };
  }

  @Get('/video-example/:id')
  getFile(@Res({ passthrough: true }) res,@Param() param): StreamableFile {
    const a=param.id+'.mp4'
    const file = createReadStream(join(process.cwd(), `videos/${a}`));
    res.set({
      'Content-Type': 'video/mp4',
      'Content-Disposition': `attachment; filename="${a}"`,
    });
    return new StreamableFile(file);
  }

  // @Get('/video-example/:id')
  // @Header('Content-type', 'video/mp4')
  // @Header('Content-Disposition', 'inline; filename="video.mp4"')
  // getFile(@Res({ passthrough: true }) res,@Param() param): StreamableFile {
  //   const a=param.id+'.mp4'
  //   const file = createReadStream(join(process.cwd(), `videos/${a}`));
  //   return new StreamableFile(file);
  // }
}
