import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST,
          port: 5432,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities: [User],
          synchronize: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/auth/register (POST)', async () => {
    return await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        full_name: 'Developer',
        email: 'developer@gmail.com',
        password: '123456??a',
        confirmPassword: '123456??a',
      })
      .expect(201);
  });

  it('/auth/login (POST)', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'developer@gmail.com',
        password: '123456??a',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('access_token');
      });
  });

  it('/auth/profile (PUT)', async () => {
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'developer@gmail.com',
        password: '123456??a',
      });

    const token = loginRes.body.access_token;

    console.log('token: ', token);

    return await request(app.getHttpServer())
      .put('/auth/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'developer@gmail.com',
        full_name: 'Admin',
        address_line_1: '82 Ryker Rd',
        address_line_2: '82 Ryker Rd 2',
        city: 'DEDIN',
        country: 'Australia',
        id: 6,
        nok_name: 'Nok name',
        nok_phone_number: '0740618352',
        phone_number: '0740618352',
        state: 'Queensland',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body);
      });
  });

  it('/auth/profile (GET)', async () => {
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'developer@gmail.com',
        password: '123456??a',
      });

    const token = loginRes.body.access_token;

    return request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body);
      });
  });

  it('/auth/dashboard (GET)', async () => {
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'developer@gmail.com',
        password: '123456??a',
      });

    const token = loginRes.body.access_token;

    return request(app.getHttpServer())
      .get('/dashboard/data')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('stats');
      });
  });
});
