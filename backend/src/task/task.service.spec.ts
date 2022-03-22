import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { TaskInterface } from './task.interface';

describe.skip('EventService', () => {
  let service: TaskService;
  let values: TaskInterface[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
    }).compile();

    service = module.get<TaskService>(TaskService);
    values = [
      {
        id: '67575e9d-dff3-4a27-a018-9fe7bbbda6fc',
        name: 'Test 01',
        completed: false,
      },
      {
        id: '67575e9d-dff3-4a27-a018-9fe7bbbda6fa',
        name: 'Test1',
        completed: false,
      },
      {
        id: '67575e9d-dff3-4a27-a018-9fe7bbbda6fb',
        name: 'Test2',
        completed: false,
      },
      {
        id: '67575e9d-dff3-4a27-a018-9fe7bbbda6f1',
        name: 'Test3',
        completed: false,
      },
      {
        id: '67575e9d-dff3-4a27-a018-9fe7bbbda6f2',
        name: 'Test4',
        completed: false,
      },
      {
        id: '67575e9d-dff3-4a27-a018-9fe7bbbda6f3',
        name: 'Test5',
        completed: false,
      },
    ];
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  it('should add a new value', async () => {
    expect(service.findAll().length).toEqual(0);
    service.create(values[0]);
    expect(service.findAll().length).toEqual(1);
    service.create(values[1]);
    expect(service.findAll()).toEqual([{ ...values[0] }, { ...values[1] }]);
  });

  it('should not add value when adding 2 values with the same id', async () => {
    expect(service.findAll().length).toEqual(0);
    service.create(values[3]);
    expect(service.findAll().length).toEqual(1);
    service.create(values[3]);
    expect(service.findAll().length).toEqual(1);
  });

  it('should update a task', function () {
    const value2Update = { ...values[0], completed: false };
    service.create(value2Update);
    service.update({ ...value2Update, completed: true });
    expect(service.findAll()).toEqual([{ ...value2Update, competed: true }]);
  });
});
