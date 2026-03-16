import clsx from "clsx";
type ContainerProps = {
  additionalClassNames?: string;
};

function Container({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerProps>) {
  return (
    <div className={clsx("bg-white h-[96px] relative rounded-[14px]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center p-px relative size-full">{children}</div>
    </div>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type TextText2Props = {
  text: string;
  additionalClassNames?: string;
};

function TextText2({ text, additionalClassNames = "" }: TextText2Props) {
  return (
    <div className={clsx("h-[15px] relative", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[15px] left-0 not-italic text-[#6a7282] text-[10px] top-0 tracking-[0.1172px]">{text}</p>
      </div>
    </div>
  );
}
type TextText1Props = {
  text: string;
};

function TextText1({ text }: TextText1Props) {
  return (
    <Wrapper additionalClassNames="h-[12px] w-[36.438px]">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[12px] left-[18px] not-italic text-[#1e2939] text-[12px] text-center top-0 uppercase">{text}</p>
    </Wrapper>
  );
}
type TextTextProps = {
  text: string;
  additionalClassNames?: string;
};

function TextText({ text, additionalClassNames = "" }: TextTextProps) {
  return (
    <div className={clsx("h-[26px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#99a1af] text-[14px] top-0 tracking-[-0.1504px]">{text}</p>
      </div>
    </div>
  );
}

export default function P3VowTrackLoFiProtos() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="P3 VowTrack Lo-Fi Protos">
      <div className="bg-[#e5e7eb] h-[1024px] overflow-clip relative shrink-0 w-full" data-name="TQ">
        <div className="absolute left-0 size-0 top-[512px]" data-name="Section" />
        <div className="absolute bg-white h-[1024px] left-0 overflow-clip shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] top-0 w-[1440px]" data-name="Container">
          <div className="absolute bg-white content-stretch flex h-[80px] items-center justify-between left-0 pb-px px-[32px] top-0 w-[1440px]" data-name="Container">
            <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
            <div className="h-[40px] relative shrink-0 w-[542.688px]" data-name="Container">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[32px] items-center relative size-full">
                <div className="relative rounded-[4px] shrink-0 size-[40px]" data-name="Container">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-center justify-center relative size-full">
                    <div className="bg-[#101828] h-[2px] shrink-0 w-[20px]" data-name="Container" />
                    <div className="bg-[#101828] h-[2px] shrink-0 w-[20px]" data-name="Container" />
                    <div className="bg-[#101828] h-[2px] shrink-0 w-[20px]" data-name="Container" />
                  </div>
                </div>
                <div className="bg-white h-[40px] relative shrink-0 w-[112px]" data-name="Container">
                  <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-0 pointer-events-none" />
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[2px] relative size-full">
                    <p className="font-['Inter:Black',sans-serif] font-black leading-[16px] not-italic relative shrink-0 text-[#101828] text-[12px] tracking-[0.6px]">LOGO</p>
                  </div>
                </div>
                <div className="flex-[1_0_0] h-[26px] min-h-px min-w-px relative" data-name="Container">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[32px] items-start relative size-full">
                    <div className="flex-[1_0_0] h-[26px] min-h-px min-w-px relative" data-name="Text">
                      <div aria-hidden="true" className="absolute border-b-2 border-black border-solid inset-0 pointer-events-none" />
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[14px] text-black top-0 tracking-[-0.1504px]">Dashboard</p>
                      </div>
                    </div>
                    <TextText text="Guests" additionalClassNames="w-[48.484px]" />
                    <TextText text="Vendors" additionalClassNames="w-[57.078px]" />
                    <TextText text="Budget" additionalClassNames="w-[49.938px]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[40px] relative shrink-0 w-[185.859px]" data-name="Container">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
                <div className="bg-[#f9fafb] flex-[1_0_0] h-[34px] min-h-px min-w-px relative rounded-[33554400px]" data-name="Container">
                  <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
                  <div className="flex flex-row items-center size-full">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[17px] py-px relative size-full">
                      <div className="bg-black opacity-64 rounded-[33554400px] shrink-0 size-[8px]" data-name="Container" />
                      <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Text">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
                          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#101828] text-[12px]">Ask VowAI</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[40px] relative shrink-0 w-[57px]" data-name="Container">
                  <div aria-hidden="true" className="absolute border-[#e5e7eb] border-l border-solid inset-0 pointer-events-none" />
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[17px] relative size-full">
                    <div className="bg-[#e5e7eb] h-[40px] relative rounded-[33554400px] shrink-0 w-full" data-name="Container">
                      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute content-stretch flex flex-col h-[888px] items-start left-0 overflow-clip top-[80px] w-[1440px]" data-name="Container">
            <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1440px]" data-name="Container">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1440px]" data-name="Container">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                    <div className="absolute h-[234px] left-[32px] top-[622px] w-[1376px]" data-name="Container">
                      <div className="absolute bg-[#f9fafb] content-stretch flex flex-col gap-[24px] h-[234px] items-center justify-center left-0 p-px rounded-[24px] top-0 w-[673px]" data-name="Container">
                        <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[24px]" />
                        <div className="h-[75px] relative shrink-0 w-[290.5px]" data-name="Container">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full text-[#101828] text-[30px] text-center">
                            <p className="-translate-x-1/2 absolute font-['Georgia:Regular',sans-serif] leading-[0] left-[145.5px] not-italic text-[0px] top-[-1px]">
                              <span className="leading-[37.5px]">{`Plan your `}</span>
                              <span className="font-['Georgia:Italic',sans-serif] italic leading-[37.5px]">perfect</span>
                              <span className="leading-[37.5px]">{` day,`}</span>
                            </p>
                            <p className="-translate-x-1/2 absolute font-['Georgia:Italic',sans-serif] italic leading-[37.5px] left-[145.48px] top-[36.5px]">stress-free.</p>
                          </div>
                        </div>
                        <div className="h-[96px] relative shrink-0 w-[272px]" data-name="Container">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-start relative size-full">
                            <Container additionalClassNames="shrink-0 w-[128px]">
                              <Wrapper additionalClassNames="h-[12px] w-[45px]">
                                <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[12px] left-[22px] not-italic text-[#1e2939] text-[12px] text-center top-0 uppercase">Bridal</p>
                              </Wrapper>
                              <TextText1 text="Suite" />
                            </Container>
                            <Container additionalClassNames="flex-[1_0_0] min-h-px min-w-px">
                              <Wrapper additionalClassNames="h-[12px] w-[47.219px]">
                                <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[12px] left-[24.5px] not-italic text-[#1e2939] text-[12px] text-center top-0 uppercase">Groom</p>
                              </Wrapper>
                              <TextText1 text="Suite" />
                            </Container>
                          </div>
                        </div>
                      </div>
                      <div className="absolute bg-white border-4 border-black border-solid h-[234px] left-[697px] rounded-[24px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)] top-0 w-[679px]" data-name="Container">
                        <div className="absolute content-stretch flex flex-col gap-[24px] h-[167px] items-center left-[79.5px] top-[29.5px] w-[512px]" data-name="Container">
                          <Wrapper additionalClassNames="h-[28px] w-[298.828px]">
                            <p className="-translate-x-1/2 absolute font-['Georgia:Bold_Italic',sans-serif] italic leading-[28px] left-[149.5px] text-[#101828] text-[20px] text-center top-0">{`"How can I help you today?"`}</p>
                          </Wrapper>
                          <div className="bg-[#f9fafb] flex-[1_0_0] min-h-px min-w-px relative rounded-[33554400px] w-[512px]" data-name="Container">
                            <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
                            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center pl-[26px] pr-[2px] py-[2px] relative size-full">
                              <div className="bg-black rounded-[33554400px] shrink-0 size-[10px]" data-name="Container" />
                              <Wrapper additionalClassNames="h-[20px] w-[241.75px]">
                                <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#99a1af] text-[14px] top-0 tracking-[-0.1504px]">Type a command or ask a question...</p>
                              </Wrapper>
                            </div>
                          </div>
                          <Wrapper additionalClassNames="h-[35px] w-[361.609px]">
                            <div className="absolute bg-black border-2 border-black border-solid h-[35px] left-0 rounded-[33554400px] top-0 w-[106.375px]" data-name="Button">
                              <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[15px] left-[51px] not-italic text-[10px] text-center text-white top-[8px] tracking-[0.1172px]">Find Venues</p>
                            </div>
                            <div className="absolute bg-white border-2 border-[#e5e7eb] border-solid h-[35px] left-[114.38px] rounded-[33554400px] top-0 w-[100.234px]" data-name="Button">
                              <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[15px] left-[48px] not-italic text-[#4a5565] text-[10px] text-center top-[8px] tracking-[0.1172px]">Draft Vows</p>
                            </div>
                            <div className="absolute bg-white border-2 border-[#e5e7eb] border-solid h-[35px] left-[222.61px] rounded-[33554400px] top-0 w-[139px]" data-name="Button">
                              <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[15px] left-[67.5px] not-italic text-[#4a5565] text-[10px] text-center top-[8px] tracking-[0.1172px]">Manage Guest List</p>
                            </div>
                          </Wrapper>
                        </div>
                        <div className="absolute bg-black h-[31px] left-[539.48px] rounded-bl-[14px] top-0 w-[131.516px]" data-name="Container">
                          <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[15px] left-[16px] not-italic text-[10px] text-white top-[8px] tracking-[0.1172px] uppercase">VowAI Concierge</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bg-[#f9fafb] border border-[#e5e7eb] border-solid h-[566px] left-[32px] overflow-clip rounded-[24px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[32px] w-[1376px]" data-name="Container">
                      <div className="absolute bg-[#e5e7eb] content-stretch flex items-center justify-center left-[958px] p-[12px] rounded-[33554400px] size-[320px] top-[122px]" data-name="Container">
                        <div aria-hidden="true" className="absolute border-12 border-solid border-white inset-0 pointer-events-none rounded-[33554400px] shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)]" />
                        <Wrapper additionalClassNames="h-[28px] w-[118.5px]">
                          <p className="absolute font-['Georgia:Italic',sans-serif] italic leading-[28px] left-0 text-[#99a1af] text-[20px] top-0">Couple Photo</p>
                        </Wrapper>
                      </div>
                      <div className="absolute h-[468px] left-[48px] top-[48px] w-[388.563px]" data-name="Container">
                        <div className="absolute bg-white content-stretch flex h-[30px] items-start left-0 px-[13px] py-[7px] top-[92.5px] w-[99.422px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none" />
                          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] tracking-[1.2px] uppercase">On Track</p>
                        </div>
                        <div className="absolute h-[60px] left-0 top-[146.5px] w-[388.563px]" data-name="Heading 2">
                          <p className="absolute font-['Inter:Black',sans-serif] font-black leading-[60px] left-0 not-italic text-[#101828] text-[60px] top-0 tracking-[-2.7363px]">Welcome Back</p>
                        </div>
                        <div className="absolute h-[65px] left-0 top-[230.5px] w-[388.563px]" data-name="Paragraph">
                          <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[32.5px] left-0 not-italic text-[#6a7282] text-[20px] top-[-1px] tracking-[-0.4492px]">{`You have `}</p>
                          <div className="absolute content-stretch flex h-[27px] items-start left-[83.97px] pb-[4px] top-[4px] w-[84.656px]" data-name="Bold Text">
                            <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-4 border-solid inset-0 pointer-events-none" />
                            <p className="font-['Inter:Bold',sans-serif] font-bold leading-[32.5px] not-italic relative shrink-0 text-[20px] text-black tracking-[-0.4492px]">145 days</p>
                          </div>
                          <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[32.5px] left-[168.63px] not-italic text-[#6a7282] text-[20px] top-[-1px] tracking-[-0.4492px]">{` until your big day.`}</p>
                          <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[32.5px] left-0 not-italic text-[#6a7282] text-[20px] top-[31.5px] tracking-[-0.4492px]">Everything is moving along perfectly.</p>
                        </div>
                        <div className="absolute content-stretch flex gap-[16px] h-[48px] items-start left-0 top-[327.5px] w-[388.563px]" data-name="Container">
                          <div className="bg-black h-[48px] relative rounded-[14px] shadow-[0px_10px_15px_0px_#e5e7eb,0px_4px_6px_0px_#e5e7eb] shrink-0 w-[156.703px]" data-name="Button">
                            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[24px] relative size-full">
                              <p className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-white">View Full Timeline</p>
                            </div>
                          </div>
                          <div className="bg-white h-[48px] relative rounded-[14px] shrink-0 w-[163.594px]" data-name="Button">
                            <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px]" />
                            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[26px] py-[2px] relative size-full">
                              <p className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-center">3 Tasks Due Today</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bg-white content-stretch flex h-[56px] items-center justify-between left-0 pt-px px-[32px] top-[968px] w-[1440px]" data-name="Container">
            <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
            <Wrapper additionalClassNames="h-[15px] w-[147.141px]">
              <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[15px] left-0 not-italic text-[#99a1af] text-[10px] top-0 tracking-[1.1172px] uppercase">© 2026 VowTrack Inc.</p>
            </Wrapper>
            <div className="h-[15px] relative shrink-0 w-[141.578px]" data-name="Container">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-start relative size-full">
                <TextText2 text="Privacy" additionalClassNames="flex-[1_0_0] min-h-px min-w-px" />
                <TextText2 text="Terms" additionalClassNames="shrink-0 w-[31.656px]" />
                <TextText2 text="Help" additionalClassNames="shrink-0 w-[23.734px]" />
              </div>
            </div>
          </div>
          <div className="absolute bg-black content-stretch flex flex-col gap-[2px] items-center justify-center left-[1352px] p-[2px] rounded-[33554400px] size-[56px] top-[888px]" data-name="Container">
            <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[33554400px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)]" />
            <div className="relative rounded-[33554400px] shrink-0 size-[24px]" data-name="Container">
              <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
                <div className="bg-white opacity-64 rounded-[33554400px] shrink-0 size-[12px]" data-name="Container" />
              </div>
            </div>
            <Wrapper additionalClassNames="h-[10.5px] w-[28.906px]">
              <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[10.5px] left-0 not-italic text-[7px] text-white top-0 tracking-[0.9301px] uppercase">VowAI</p>
            </Wrapper>
          </div>
        </div>
      </div>
    </div>
  );
}