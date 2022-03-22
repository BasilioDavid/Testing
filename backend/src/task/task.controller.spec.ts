import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskInterface } from './task.interface';

describe.only('EventController', () => {
  let controller: TaskController;
  let service: TaskService;
  let values: TaskInterface[];

  beforeEach(async () => {
    values = [
      {
        id: 'hola',
        name: 'Test',
        completed: true,
      },
      {
        id: 'hola2',
        name: 'Test1',
        completed: true,
      },
      {
        id: 'hola3',
        name: 'Test2',
        completed: true,
      },
      {
        id: 'hola4',
        name: 'Test3',
        completed: true,
      },
      {
        id: 'hola5',
        name: 'Test4',
        completed: true,
      },
      {
        id: 'hola6',
        name: 'Test5',
        completed: true,
      },
    ];
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useFactory: () => ({
            findAll: jest.fn(() => values),
            create: jest.fn(),
            findByDate: jest.fn(() => {}),
          }),
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should find all services', () => {
    const values = controller.findAll();
    expect(service.findAll).toHaveBeenCalledTimes(1);
    expect(values).toEqual(values);
  });

  it('should create a value', function () {
    controller.create(values[0]);
    expect(service.create).toHaveBeenCalled();
    expect(service.create).toHaveBeenCalledWith(values[0]);
  });
});
