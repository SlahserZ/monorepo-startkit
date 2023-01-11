/*
 * @Author: SlahserZ
 * @Date: 2023-01-11 10:57:41
 * @LastEditors: SlahserZ
 * @LastEditTime: 2023-01-11 14:22:11
 * @FilePath: /monorepo-startkit/packages/core/src/loader/base.ts
 * @Description: Base Loader
 */
import { clamp } from "math.gl";

type FrameData<K extends keyof EventTypeCallback> = Pick<
  EventTypeCallback,
  K
>[];

type Callback<K extends keyof EventTypeCallback> = (
  frameData: FrameData<K>
) => void;

abstract class LoaderInterface {
  state: { [key: string]: unknown };

  callbacks: Map<keyof EventTypeCallback, Function[]>;

  updates: number;

  constructor() {
    this.updates = 0;
    this.state = {};
    this.callbacks = new Map();
  }

  on<T extends keyof EventTypeCallback>(
    eventType: T,
    cb: Callback<T>
  ): LoaderInterface {
    const cbList = this.callbacks.get(eventType);
    if (cbList) {
      cbList.push(cb);
    } else {
      this.callbacks.set(eventType, [cb]);
    }
    return this;
  }

  off<T extends keyof EventTypeCallback>(eventType: T, cb: Callback<T>): void {
    const cbList = this.callbacks.get(eventType);
    if (cbList) {
      const i = cbList.findIndex((fc) => fc === cb);
      if (i >= 0) {
        cbList.splice(i, 1);
      }
    }
  }

  emit<T extends keyof EventTypeCallback>(eventType: T, eventArgs?: unknown) {
    const cbList = this.callbacks.get(eventType);
    if (cbList) {
      // eslint-disable-next-line no-restricted-syntax
      for (const cb of cbList) {
        cb(eventType, eventArgs);
      }
    }
  }

  onError = async (error: ErrorEvent): Promise<ErrorEvent> => {
    this.emit("error", error);
    return error;
  };

  seek(timestamp: number): void {
    const metadata = this.getMetadata();
    let ret: number = -1;
    if (metadata) {
      const startTime = this.getLogStartTime();
      const endTime = this.getLogEndTime();
      if (Number.isFinite(startTime) && Number.isFinite(endTime)) {
        ret = clamp(timestamp, startTime, endTime);
      }
    }

    this.set("timestamp", ret);
  }

  onMessage = async (msg: Message<"metadata" | "timeslice" | "done">) => {
    const { type, data } = msg;
    switch (type) {
      case "metadata":
        this.onMetadata(data);
        this.emit("ready", msg);
        break;
      case "timeslice":
        this.onTimeslice(data);
        this.emit("ready", msg);
        break;
      case "done":
        break;
      default:
    }
  };

  get(key: string) {
    return this.state[key];
  }

  set(key: string, value: unknown): boolean {
    if (this.state[key] !== value) {
      this.state[key] = value;
      // if (!this._updateTimer) {
      //   /* global requestAnimationFrame */
      //   this._updateTimer = requestAnimationFrame(this._update);
      // }
      return true;
    }
    return false;
  }

  private bumpDataVersion(): void {
    this.updates += 1;
    this.set("dataVersion", this.updates);
  }

  private onMetadata(metadata: Metadata) {
    this.set("metadata", metadata);
    if (metadata.streams && Object.keys(metadata.streams).length > 0) {
      this.set("streamSettings", metadata.streams);
    }

    const timestamp = this.get("timestamp");
    const newTimestamp = Number.isFinite(timestamp)
      ? timestamp
      : metadata.start_time;
    if (Number.isFinite(newTimestamp)) {
      this.seek(newTimestamp as number);
    }
  }

  private onTimeslice(timeslice: TimeSlice) {
    console.log(timeslice, this);
    // const bufferUpdated = this.streamBuffer.insert(timeslice);
    // if (bufferUpdated) {
    //   this.bumpDataVersion();
    // }

    // return bufferUpdated;
  }

  getMetadata = () => this.get("metadata");

  /**
   * Whether the loader is loading data.
   */
  abstract get isOpen(): boolean;

  /**
   * Starting to load data.
   */
  abstract connect(): boolean;

  /**
   * Stoping loading data.
   */
  abstract close(): boolean;

  /**
   * Returns the current timestamp in seconds.
   */
  getCurrentFrame = (): Frame | null => this.get("timestamp") as Frame | null;

  /**
   * Returns the current look ahead offset in seconds.
   */
  getLookAhead = (): LookAhead | null =>
    this.get("lookAhead") as LookAhead | null;

  /**
   * Returns the current look ahead offset in seconds.
   */
  setLookAhead = (lookAhead: LookAhead): boolean =>
    this.set("lookAhead", lookAhead);

  /**
   * Returns the start timestamp of the log.
   *
   */
  abstract getLogStartTime(): number;

  /**
   * Returns the end timestamp of the log.
   *
   * @returns {Number} end timestamp.
   */
  abstract getLogEndTime(): number;

  /**
   * Returns the loaded time ranges of the buffer, as an array of `[start, end]` timestamps.
   * @returns {[Number, Number]} - [start, end] timestamps.
   */
  abstract getBufferedTimeRanges(): [number, number];
}

export default LoaderInterface;
