import sys
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline, TextIteratorStreamer
from threading import Thread

if len(sys.argv) < 1:
    print("Usage: python demo2.py prompt")
    sys.exit(1)
else:
    prompt = "Write a series of overcomplicated instructions for " + sys.argv[1]

model_name_or_path = "TheBloke/CapybaraHermes-2.5-Mistral-7B-GPTQ"
# To use a different branch, change revision
# For example: revision="gptq-4bit-32g-actorder_True"
model = AutoModelForCausalLM.from_pretrained(model_name_or_path,
                                             device_map="auto",
                                             trust_remote_code=False,
                                             revision="main")

# tokenizer = AutoTokenizer.from_pretrained(model_name_or_path, use_fast=True)

tokenizer = AutoTokenizer.from_pretrained(model_name_or_path)

# prompt = "Write a series of overcomplicated instructions for making a BLT sandwich."
system_message = "You are a instruction manual generator AI. You have been tasked to provide overcomplicated instructions. Instructions only."
prompt_template=f'''<|im_start|>system
{system_message}<|im_end|>
<|im_start|>user
{prompt}<|im_end|>
<|im_start|>assistant
'''

print("\n\n*** Generate:")

input_ids = tokenizer(prompt_template, return_tensors='pt').input_ids.cuda()
output = model.generate(inputs=input_ids, temperature=0.7, do_sample=True, top_p=0.95, top_k=40, max_new_tokens=2048)
print(tokenizer.decode(output[0]))

# streamer = TextIteratorStreamer(tokenizer)
# gen_kwargs = dict(input_ids, streamer=streamer, max_new_tokens=20)

# thread = Thread(target=model.generate, kwargs=gen_kwargs)
# thread.start()

# generated_text = ''
# for text in streamer:
#     generated_text += text
#     print(generated_text)

# Inference can also be done using transformers' pipeline

# print("*** Pipeline:")
# pipe = pipeline(
#     "text-generation",
#     model=model,
#     tokenizer=tokenizer,
#     max_new_tokens=1024,
#     do_sample=True,
#     temperature=0.7,
#     top_p=0.95,
#     top_k=40,
#     repetition_penalty=1.1
# )

# print(pipe(prompt_template)[0]['generated_text'])