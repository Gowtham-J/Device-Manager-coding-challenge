const dateValidation = (respond: any, Device: any) => {
  respond.map(async (data: any) => {
    const device = await Device.findById(data.id);

    // To set two dates to two variables
    const date1 = data.lastCheckedOutDate;
    // const date2 = new Date("02/25/2022");
    const date2 = new Date();

    // To calculate the time difference of two dates
    const Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    //To display the final no. of days (result)
    if (Difference_In_Days >= 15) {
      device?.set({
        status: "in-active",
      });
      await device?.save();
    } else {
      device?.set({
        status: "active",
      });
      await device?.save();
    }
  });
};

export { dateValidation };
