import mongoose from "mongoose";

// An interface that describes the properties
// that are required to create a new device
interface DeviceAttr {
  device: string;
  os: string;
  manufacturer: string;
  lastCheckedOutDate: Date;
  lastCheckedOutBy: string;
  isCheckedOut: boolean;
  userId: string;
  status: string;
}

// An interface that describes the properties
// that a device Model has
interface DeviceModel extends mongoose.Model<DeviceDoc> {
  build(attrs: DeviceAttr): DeviceDoc;
}

// An interface that describes the properties
// that a device Document has
interface DeviceDoc extends mongoose.Document {
  device: string;
  os: string;
  manufacturer: string;
  lastCheckedOutDate: Date;
  lastCheckedOutBy: string;
  isCheckedOut: boolean;
  userId: string;
  status: string;
}

const deviceSchema = new mongoose.Schema(
  {
    device: {
      required: true,
      type: String,
    },
    os: {
      required: true,
      type: String,
    },
    manufacturer: {
      required: true,
      type: String,
    },
    lastCheckedOutDate: {
      required: true,
      type: Date,
    },
    lastCheckedOutBy: {
      required: true,
      type: String,
    },
    isCheckedOut: {
      required: true,
      type: Boolean,
    },
    userId: {
      required: true,
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

deviceSchema.statics.build = (attr: DeviceAttr) => {
  return new Device(attr);
};

const Device = mongoose.model<DeviceDoc, DeviceModel>("Device", deviceSchema);

export { Device };
