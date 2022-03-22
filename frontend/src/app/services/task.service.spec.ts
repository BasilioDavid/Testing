import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { FetchDataService } from '../common/modules/fetch-data/fetch-data.service';
import { of } from 'rxjs';
import { TaskInterface } from '../shared/Task.interface';

describe('TaskService', () => {
  let service: TaskService;
  let fetchDataServiceSpy: jasmine.SpyObj<FetchDataService>;
  let values: TaskInterface[];

  class FetchDataMock {
    public get(foo: string) {
      return values;
    }

    public post(foo: string, values: any) {}

    public patch(foo: string, values: any) {}
  }

  beforeEach(() => {
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
    // const fetchDataSpy = jasmine.createSpyObj('FetchDataService', [
    //   'get',
    //   'patch',
    //   'post',
    // ]);
    // const httpSpy = jasmine.createSpyObj('HttpClient', [
    //   'get',
    //   'patch',
    //   'post',
    // ]);
    TestBed.configureTestingModule({
      providers: [
        TaskService,
        { provide: FetchDataService, useClass: FetchDataMock },
      ],
      // imports: [{ provide: HttpClient, useValue: HttpClientTestingModule }],
    });
    fetchDataServiceSpy = TestBed.inject(
      FetchDataService
    ) as jasmine.SpyObj<FetchDataService>;
    fetchDataServiceSpy.get.and.returnValue(of([{ ...values[0] }]));
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get all tasks', function () {
    service.tasks$.subscribe(
      (t) => expect(t).toEqual([{ ...values[0] }]),
      () => expect(false).toBeTruthy()
    );
  });
});
