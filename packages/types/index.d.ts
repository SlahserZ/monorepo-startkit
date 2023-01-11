/*
 * @Author: SlahserZ
 * @Date: 2023-01-11 11:00:18
 * @LastEditors: SlahserZ
 * @LastEditTime: 2023-01-11 14:25:19
 * @FilePath: /monorepo-startkit/packages/types/index.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
type EventTypeCallback = {
  ready: string;
  update: string;
  finish: string;
  error: boolean;
  done: number;
};

type MessageType = { metadata: Metadata; timeslice: TimeSlice; done: Done };

interface Message<T extends keyof MessageType> {
  type: T;
  data: MessageData<T>;
}

interface Metadata {
  streams: Streams;
  start_time: number;
  logInfo: {
    start_time: number;
    end_time: number;
    total_size: number;
    frame_cnt: number;
    intervention_time: number[];
    version: string;
    // @TODO: I will move the map_list to persistent streams.
    // @Author: Slasher Zou
    map_list: any;
  };
}

interface TimeSlice {
  updateType: "SNAPSHOT" | "COMPLETE";
  timestamp: number;
  updates: {
    streams: Streams;
    poses: Pose;
  };
  persistent: {};
}

interface Frame {}

interface LookAhead {}
