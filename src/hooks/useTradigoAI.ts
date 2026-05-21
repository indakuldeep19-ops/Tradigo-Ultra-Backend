'use client';

import { useEffect } from "react";

import { TradigoBrain }
from "@/ai/tradigo-brain";

export default function
useTradigoAI() {

  useEffect(() => {

    TradigoBrain.monitorSystem();

    const ai =
      setInterval(() => {

        TradigoBrain.scanMarket();

        TradigoBrain.detectTrend();

        TradigoBrain.detectCrash();

        TradigoBrain.detectPump();

        TradigoBrain.autoSignals();

      }, 15000);

    return () =>
      clearInterval(ai);

  }, []);

}
