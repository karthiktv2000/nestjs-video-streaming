## Video Streaming example with Nestjs

#### What do you need to be done?

1. Create a route that will serve the video you want to upload:

```ts
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
```

2. Consume the video using the video tag on your webpage:

```html
<video width="80%" height="50%" controls>
        <source src="/video-example/{{message}}" type="video/mp4">
</video>
```
3. Result (access localhost:3000):
![image](/videos/result.png)
